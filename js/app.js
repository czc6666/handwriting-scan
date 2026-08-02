/* 手写扫描通 - 核心逻辑 */
(() => {
  'use strict';

  const MAX_FREE_DAILY = 20;
  const QUOTA_KEY = 'hs_quota';
  const QUOTA_DATE_KEY = 'hs_quota_date';

  // DOM 引用
  const $ = id => document.getElementById(id);
  const dropZone = $('dropZone');
  const fileInput = $('fileInput');
  const uploadCard = $('uploadCard');
  const previewArea = $('previewArea');
  const previewImg = $('previewImg');
  const previewName = $('previewName');
  const previewSize = $('previewSize');
  const resetBtn = $('resetBtn');
  const recognizeBtn = $('recognizeBtn');
  const scanning = $('scanning');
  const scanStep = $('scanStep');
  const resultCard = $('resultCard');
  const fieldsGrid = $('fieldsGrid');
  const fieldsSection = $('fieldsSection');
  const mdOutput = $('mdOutput');
  const copyBtn = $('copyBtn');
  const downloadMdBtn = $('downloadMdBtn');
  const downloadWordBtn = $('downloadWordBtn');
  const downloadCsvBtn = $('downloadCsvBtn');
  const downloadXlsxBtn = $('downloadXlsxBtn');
  const downloadTxtBtn = $('downloadTxtBtn');
  const quotaText = $('quotaText');
  const themeToggle = $('themeToggle');
  const langToggle = $('langToggle');

  let currentFile = null;
  let currentResult = null; // { fields: [{label,value,confidence}], markdown, raw }

  /* ============ 主题 ============ */
  function initTheme() {
    const saved = localStorage.getItem('hs_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  }
  themeToggle.addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme;
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('hs_theme', next);
  });

  /* ============ 语言 ============ */
  langToggle.addEventListener('click', () => {
    applyLang(currentLang === 'zh-CN' ? 'en' : 'zh-CN');
  });

  /* ============ 免费额度 ============ */
  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }
  function getQuota() {
    const date = localStorage.getItem(QUOTA_DATE_KEY);
    const used = parseInt(localStorage.getItem(QUOTA_KEY) || '0', 10);
    if (date !== todayStr()) {
      localStorage.setItem(QUOTA_DATE_KEY, todayStr());
      localStorage.setItem(QUOTA_KEY, '0');
      return 0;
    }
    return used;
  }
  function incrementQuota() {
    const used = getQuota() + 1;
    localStorage.setItem(QUOTA_KEY, String(used));
    updateQuotaUI();
    return used;
  }
  function updateQuotaUI() {
    const used = getQuota();
    const left = Math.max(0, MAX_FREE_DAILY - used);
    quotaText.textContent = currentLang === 'zh-CN'
      ? `今日剩余 ${left} 次`
      : `${left} left today`;
    return left;
  }

  /* ============ 上传与压缩 ============ */
  function handleFiles(files) {
    if (!files || !files.length) return;
    const file = files[0];
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      showToast(t('errorNoFile'));
      return;
    }
    currentFile = file;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        previewImg.src = e.target.result;
        previewName.textContent = file.name;
        previewSize.textContent = formatSize(file.size);
        showPreview();
      };
      reader.readAsDataURL(file);
    } else {
      // PDF 直接显示文件名
      previewImg.style.display = 'none';
      previewName.textContent = file.name;
      previewSize.textContent = formatSize(file.size);
      showPreview();
    }
  }
  function showPreview() {
    dropZone.hidden = true;
    previewArea.hidden = false;
  }
  function resetUI() {
    currentFile = null;
    currentResult = null;
    dropZone.hidden = false;
    previewArea.hidden = true;
    scanning.hidden = true;
    resultCard.hidden = true;
    uploadCard.hidden = false;
    setUploadCompact(false);
    fileInput.value = '';
  }
  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }

  // 识别中/结果展示时收缩上传卡
  function setUploadCompact(compact) {
    uploadCard.classList.toggle('compact', compact);
  }

  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });
  fileInput.addEventListener('change', e => handleFiles(e.target.files));
  resetBtn.addEventListener('click', resetUI);

  /* ============ 压缩图片（浏览器本地） ============ */
  function compressImage(file, maxDim = 2048, quality = 0.85) {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        resolve(file); // PDF 不压缩
        return;
      }
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        canvas.toBlob(blob => {
          if (!blob) { reject(new Error('compress fail')); return; }
          resolve(blob);
        }, 'image/jpeg', quality);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('image load fail')); };
      img.src = url;
    });
  }

  /* ============ 识别 ============ */
  recognizeBtn.addEventListener('click', async () => {
    if (!currentFile) { showToast(t('errorNoFile')); return; }
    const left = updateQuotaUI();
    if (left <= 0) { showToast(t('errorQuota')); return; }

    // UI 切到识别中
    previewArea.hidden = true;
    scanning.hidden = false;
    resultCard.hidden = true;
    setUploadCompact(true);
    scanStep.textContent = t('scanStep1');

    try {
      // 压缩图片
      const compressed = await compressImage(currentFile);
      scanStep.textContent = t('scanStep2');

      // 转 base64
      const b64 = await blobToBase64(compressed);

      // 调后端
      scanStep.textContent = t('scanStep3');
      const resp = await fetch('/api/recognize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_base64: b64,
          lang: currentLang
        })
      });

      if (resp.status === 429) {
        showToast(t('errorQuota'));
        scanning.hidden = true;
        previewArea.hidden = false;
        return;
      }
      if (!resp.ok) {
        throw new Error('HTTP ' + resp.status);
      }

      const data = await resp.json();
      if (!data.ok) throw new Error(data.error || 'recognize fail');

      currentResult = data.result;
      incrementQuota();
      renderResult(data.result);
      scanning.hidden = true;
      resultCard.hidden = false;
      uploadCard.hidden = true; // 结果展示后隐藏上传卡，避免空白
    } catch (err) {
      console.error(err);
      showToast(t('errorNetwork'));
      scanning.hidden = true;
      previewArea.hidden = false;
    }
  });

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /* ============ 渲染结果 ============ */
  function renderResult(result) {
    // 字段确认区
    if (result.fields && result.fields.length) {
      fieldsSection.hidden = false;
      fieldsGrid.innerHTML = '';
      result.fields.forEach((f, i) => {
        const row = document.createElement('div');
        row.className = 'field-row' + (f.confidence === 'low' ? ' confidence-low' : '');

        const label = document.createElement('div');
        label.className = 'field-label';
        label.textContent = f.label || `#${i + 1}`;

        const input = document.createElement('input');
        input.className = 'field-value';
        input.value = f.value || '';
        input.addEventListener('input', () => {
          result.fields[i].value = input.value;
          syncMarkdownFromFields();
        });

        const badge = document.createElement('span');
        badge.className = 'field-badge ' + (f.confidence === 'low' ? 'badge-low' : 'badge-high');
        badge.textContent = f.confidence === 'low'
          ? (currentLang === 'zh-CN' ? '需确认' : 'Check')
          : (currentLang === 'zh-CN' ? '已识别' : 'OK');
        if (f.confidence === 'low' && f.note) {
          badge.title = f.note;
          badge.textContent = currentLang === 'zh-CN' ? '需确认 ⚠' : 'Check ⚠';
        }

        row.appendChild(label);
        row.appendChild(input);
        row.appendChild(badge);
        fieldsGrid.appendChild(row);
      });
    } else {
      fieldsSection.hidden = true;
    }

    // Markdown
    mdOutput.textContent = result.markdown || '';
  }

  function syncMarkdownFromFields() {
    if (!currentResult) return;
    // 简单重建：字段区修改后 markdown 同步——这里直接保留原始 markdown，
    // 编辑字段值的同时也更新 mdOutput 里对应部分比较难做精确映射，
    // 简单方案：提供"从字段重新生成"的完整 markdown
    const md = buildMarkdownFromFields();
    if (md) mdOutput.textContent = md;
    currentResult.markdown = mdOutput.textContent;
  }

  function buildMarkdownFromFields() {
    if (!currentResult || !currentResult.fields) return null;
    const lines = ['# 识别结果', ''];
    currentResult.fields.forEach(f => {
      if (!f.label) return;
      lines.push(`- **${f.label}**：${f.value || ''}`);
    });
    return lines.join('\n');
  }

  /* ============ 复制与导出 ============ */
  copyBtn.addEventListener('click', async () => {
    const text = mdOutput.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      showToast(t('copySuccess'));
    } catch (e) {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast(t('copySuccess'));
    }
  });

  downloadMdBtn.addEventListener('click', () => {
    download('handwriting.md', mdOutput.textContent || '', 'text/markdown;charset=utf-8');
  });

  downloadTxtBtn.addEventListener('click', () => {
    download('handwriting.txt', mdOutput.textContent || '', 'text/plain;charset=utf-8');
  });

  // 真正的 Word (.docx) 导出：解析 Markdown → docx 结构
  downloadWordBtn.addEventListener('click', () => {
    if (!window.docx) {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js';
      s.onload = () => exportDocx();
      s.onerror = () => showToast(t('errorNetwork'));
      document.head.appendChild(s);
    } else {
      exportDocx();
    }
  });

  function exportDocx() {
    if (!window.docx) { showToast(t('errorNetwork')); return; }
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType } = window.docx;

    const md = mdOutput.textContent || '';
    const children = [];
    let tableBuffer = [];

    const flushTable = () => {
      if (!tableBuffer.length) return;
      const rows = tableBuffer.map((cells, ri) =>
        new TableRow({
          children: cells.map(cell =>
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: cell })] })]
            })
          ),
          tableHeader: ri === 0
        })
      );
      children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows }));
      tableBuffer = [];
    };

    for (const rawLine of md.split('\n')) {
      const line = rawLine.trim();
      if (!line) { flushTable(); children.push(new Paragraph({ text: '' })); continue; }

      // 表格行
      if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line.slice(1, -1).split('|').map(c => c.trim());
        // 跳过分隔行 |---|
        if (!cells.every(c => /^:?-{2,}:?$/.test(c))) tableBuffer.push(cells);
        continue;
      }
      flushTable();

      // 标题
      const hMatch = line.match(/^(#{1,4})\s+(.*)/);
      if (hMatch) {
        const level = hMatch[1].length;
        const heading = level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : level === 3 ? HeadingLevel.HEADING_3 : HeadingLevel.HEADING_4;
        children.push(new Paragraph({ heading, children: [new TextRun({ text: hMatch[2], bold: true })] }));
        continue;
      }
      // 无序列表（含 TODO）
      const ulMatch = line.match(/^[-*]\s+(.*)/);
      if (ulMatch) {
        children.push(new Paragraph({
          bullet: { level: 0 },
          children: [new TextRun({ text: ulMatch[1] })]
        }));
        continue;
      }
      // 有序列表
      const olMatch = line.match(/^\d+[.、)]\s+(.*)/);
      if (olMatch) {
        children.push(new Paragraph({
          numbering: { reference: 'ordered', level: 0 },
          children: [new TextRun({ text: olMatch[1] })]
        }));
        continue;
      }
      // 加粗段落 **xxx**
      const bMatch = line.match(/^\*\*(.*)\*\*$/);
      if (bMatch) {
        children.push(new Paragraph({ children: [new TextRun({ text: bMatch[1], bold: true })] }));
        continue;
      }
      // 普通段落
      children.push(new Paragraph({ children: [new TextRun({ text: line.replace(/^#+\s*/, '') })] }));
    }
    flushTable();

    const doc = new Document({
      numbering: { config: [{ reference: 'ordered', levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.START }] }] },
      sections: [{ children }]
    });

    Packer.toBlob(doc).then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'handwriting.docx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      showToast(t('downloadWordSuccess'));
    });
  }

  downloadCsvBtn.addEventListener('click', () => {
    const csv = buildCsv();
    // BOM 让 Excel 正确识别 UTF-8
    download('handwriting.csv', '\uFEFF' + csv, 'text/csv;charset=utf-8');
  });

  downloadXlsxBtn.addEventListener('click', () => {
    if (!window.XLSX) {
      // 动态加载 SheetJS
      const s = document.createElement('script');
      s.src = 'https://cdn.sheetjs.com/xlsx-0.20.2/package/dist/xlsx.full.min.js';
      s.onload = () => exportXlsx();
      document.head.appendChild(s);
    } else {
      exportXlsx();
    }
  });

  function exportXlsx() {
    const rows = buildRows();
    const ws = window.XLSX.utils.aoa_to_sheet(rows.length ? rows : [['']]);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    window.XLSX.writeFile(wb, 'handwriting.xlsx');
  }

  function buildRows() {
    if (!currentResult) return [];
    // 优先表格行（如果识别出表格）
    if (currentResult.table && currentResult.table.length) {
      return currentResult.table;
    }
    // 否则字段键值对
    if (currentResult.fields && currentResult.fields.length) {
      return currentResult.fields.map(f => [f.label || '', f.value || '']);
    }
    return [];
  }

  function buildCsv() {
    const rows = buildRows();
    return rows.map(r =>
      r.map(cell => {
        const s = String(cell ?? '');
        return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
      }).join(',')
    ).join('\n');
  }

  function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  /* ============ Toast ============ */
  let toastTimer = null;
  function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  /* ============ 初始化 ============ */
  initTheme();
  applyLang(currentLang);
  updateQuotaUI();
})();
