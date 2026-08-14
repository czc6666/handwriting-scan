/* 图片转Excel Img2Excel - 中英语言切换 */
const I18N = {
  'zh-CN': {
    brand: '图片转Excel',
    handwritingLink: '手写转文字',
    heroBadge: 'AI 表格识别 · 免费 · 免登录',
    heroTitle1: '图片转 Excel · 表格一键提取',
    heroTitle2: '截图、拍照、扫描件 → 可编辑 Excel',
    heroSub: '上传表格截图、手机拍的照片、PDF 或扫描件，AI 自动识别表格结构（行列、合并单元格），一键导出可编辑的 Excel / CSV，不用再手动敲数据。',
    quotaLabel: '今日剩余',
    quotaUnit: '次',
    dropTitle: '拖拽表格图片到这里，或点击上传',
    dropSub: '支持 JPG / PNG / PDF · 表格截图、拍照、扫描件均可',
    reset: '重新上传',
    recognize: '开始识别',
    scanning: '正在识别表格…',
    scanStep1: '读取图片',
    scanStep2: '识别表格结构',
    scanStep3: '整理为 Excel 数据',
    resultTitle: '识别结果',
    confirmHint: '⚠ 不确定的内容已高亮，点击可直接修改',
    mdPreview: 'Markdown 源码（可编辑）',
    copy: '复制',
    downloadMd: 'Markdown',
    downloadWord: 'Word',
    downloadCsv: 'CSV',
    downloadXlsx: 'Excel',
    downloadTxt: 'TXT',
    downloadWordSuccess: 'Word 文档已生成',
    copySuccess: '已复制到剪贴板',
    quotaExhausted: '今日免费额度已用完，明天再来吧',
    quotaLeft: '今日剩余 {n} 次免费转换',
    errorNoFile: '请先选择图片',
    errorUpload: '上传失败，请重试',
    errorNetwork: '识别服务暂时不可用，请稍后再试',
    errorQuota: '今日免费额度已用完',
    howTitle: '图片转表格、转 Excel，三步完成',
    step1Title: '上传表格图片',
    step1Desc: '截图、手机拍照、扫描件或 PDF 都可以，拖进页面即可',
    step2Title: 'AI 识别表格结构',
    step2Desc: '自动识别行、列、合并单元格和表头，保留原表格布局',
    step3Title: '导出可编辑 Excel',
    step3Desc: '修改不确定处，一键导出 Excel / CSV / Word / Markdown',
    usecaseTitle: '这些场景，别再用键盘敲数据了',
    uc1Title: '财务报表 / 台账',
    uc1Desc: '拍下纸质报表或截图，转成 Excel 直接改数字',
    uc2Title: '发票 / 单据',
    uc2Desc: '发票、对账单、报价单照片，一键提取成表格',
    uc3Title: '课表 / 名单 / 登记表',
    uc3Desc: '课程表、花名册、签到表，拍照即得可编辑表格',
    uc4Title: '网页 / PPT 里的表格',
    uc4Desc: '截图网页或演示文稿中的表格，直接转 Excel 复用',
    faqTitle: '常见问题',
    faq1Q: '图片怎么转成 Excel？免费吗？',
    faq1A: '很简单：上传表格截图、手机拍的照片、PDF 或扫描件，AI 自动识别表格结构，一键导出可编辑的 Excel。完全免费，无需登录，每个设备每天 20 次免费转换。',
    faq2Q: '截图能转成 Excel 表格吗？',
    faq2A: '可以，这是最常用的场景。直接截图网页、聊天记录、PDF 里的表格，上传后自动识别行、列、合并单元格，导出 Excel 就能直接编辑，不用手动敲。',
    faq3Q: 'PDF 里的表格能转成 Excel 吗？',
    faq3A: '可以。上传 PDF（或截图 PDF 里的表格页面），AI 会识别表格结构并转成 Excel。扫描件 PDF 也支持。',
    faq4Q: '表格识别准确吗？合并单元格会保留吗？',
    faq4A: '基于 GPT-5.6 视觉模型，对表格结构识别效果好，能自动识别表头、行、列和合并单元格。拿不准的地方会用黄色高亮标出，你可以点击修改后再导出。',
    faq5Q: '支持手写表格吗？',
    faq5A: '支持。手写的账本、课表、登记表也能识别。如果是纯手写笔记（没有表格），建议用我们的手写转文字工具，识别效果更好。',
    faq6Q: '图片转 Word 也可以吗？',
    faq6A: '可以。识别结果除了导出 Excel / CSV，也支持导出 Word、Markdown、TXT。图片转 Word、图片转表格都能做。',
    faq7Q: '上传的图片会保存吗？隐私安全吗？',
    faq7A: '不会保存。图片仅用于本次表格识别，识别完成后立即丢弃，服务器不留存任何文件，也没有账号体系，隐私优先。',
    faq8Q: '手机和电脑都能用吗？',
    faq8A: '都可以。手机、平板、电脑浏览器直接打开就能用，无需下载软件或 app。免费额度用完后第二天自动恢复。',
    footerNote: '📊 图片转Excel Img2Excel · 免费图片转表格/截图转表格/PDF转Excel在线工具 · 图片不留存',
    previewLabel: '预览',
    processing: '处理中…'
  },
  'en': {
    brand: 'Img2Excel',
    handwritingLink: 'Handwriting → Text',
    heroBadge: 'AI Table Recognition · Free · No Sign-up',
    heroTitle1: 'Image to Excel · Extract tables instantly',
    heroTitle2: 'Screenshots, photos, scans → editable Excel',
    heroSub: 'Upload a table screenshot, a photo, a PDF or a scan — AI detects rows, columns and merged cells, then exports an editable Excel / CSV. Stop retyping data by hand.',
    quotaLabel: 'Left today',
    quotaUnit: '',
    dropTitle: 'Drag a table image here, or click to upload',
    dropSub: 'JPG / PNG / PDF · Screenshots, photos, scans',
    reset: 'Re-upload',
    recognize: 'Recognize',
    scanning: 'Recognizing table…',
    scanStep1: 'Reading image',
    scanStep2: 'Detecting table structure',
    scanStep3: 'Building Excel data',
    resultTitle: 'Recognition Result',
    confirmHint: '⚠ Uncertain items are highlighted — click to edit',
    mdPreview: 'Markdown source (editable)',
    copy: 'Copy',
    downloadMd: 'Markdown',
    downloadWord: 'Word',
    downloadCsv: 'CSV',
    downloadXlsx: 'Excel',
    downloadTxt: 'TXT',
    downloadWordSuccess: 'Word document generated',
    copySuccess: 'Copied to clipboard',
    quotaExhausted: 'Daily free quota used up — come back tomorrow',
    quotaLeft: '{n} free conversions left today',
    errorNoFile: 'Please select an image first',
    errorUpload: 'Upload failed, please retry',
    errorNetwork: 'Recognition service unavailable, try again later',
    errorQuota: 'Daily free quota used up',
    howTitle: 'Image to table & Excel in 3 steps',
    step1Title: 'Upload a table image',
    step1Desc: 'Screenshot, photo, scan or PDF — just drag it in',
    step2Title: 'AI detects table structure',
    step2Desc: 'Recognizes rows, columns, merged cells and headers, preserving layout',
    step3Title: 'Export editable Excel',
    step3Desc: 'Edit uncertain items, export to Excel / CSV / Word / Markdown in one click',
    usecaseTitle: 'Stop retyping data by hand',
    uc1Title: 'Reports / ledgers',
    uc1Desc: 'Photograph paper reports or screenshots, edit numbers in Excel',
    uc2Title: 'Invoices / receipts',
    uc2Desc: 'Extract invoices, statements and quotes into tables',
    uc3Title: 'Schedules / lists / forms',
    uc3Desc: 'Class schedules, rosters, sign-in sheets — snap and get editable tables',
    uc4Title: 'Tables in web / PPT',
    uc4Desc: 'Screenshot tables from websites or slides, reuse them in Excel',
    faqTitle: 'FAQ',
    faq1Q: 'How do I convert an image to Excel? Is it free?',
    faq1A: 'Easy: upload a table screenshot, a photo, a PDF or a scan. AI detects the table structure and exports an editable Excel file. Completely free, no sign-up, 20 free conversions per device per day.',
    faq2Q: 'Can I convert a screenshot to an Excel table?',
    faq2A: 'Yes — the most common use case. Screenshot a table from a webpage, chat or PDF, upload it, and AI recognizes rows, columns and merged cells. Export to Excel and edit directly.',
    faq3Q: 'Can I convert tables in a PDF to Excel?',
    faq3A: 'Yes. Upload the PDF (or screenshot the table pages) and AI converts the table structure to Excel. Scanned PDFs work too.',
    faq4Q: 'How accurate is table recognition? Are merged cells preserved?',
    faq4A: 'Built on the GPT-5.6 vision model, it recognizes headers, rows, columns and merged cells well. Uncertain items are highlighted in yellow — click to edit before exporting.',
    faq5Q: 'Does it support handwritten tables?',
    faq5A: 'Yes. Handwritten ledgers, schedules and forms work. For pure handwritten notes (without tables), try our handwriting-to-text tool for better results.',
    faq6Q: 'Can I convert image to Word too?',
    faq6A: 'Yes. Besides Excel / CSV, you can export to Word, Markdown and TXT. Image to Word and image to table both work.',
    faq7Q: 'Are my uploaded images stored? Is it private?',
    faq7A: 'No. Images are used only for the current table recognition and discarded immediately. Nothing stored on servers, no accounts, privacy first.',
    faq8Q: 'Does it work on mobile and desktop?',
    faq8A: 'Yes, both. Open in any browser on phone, tablet or computer — no app or software download. Free quota resets automatically the next day.',
    footerNote: '📊 Img2Excel · Free image-to-table / screenshot-to-table / PDF-to-Excel online tool · Images never stored',
    previewLabel: 'Preview',
    processing: 'Processing…'
  }
};

let currentLang = localStorage.getItem('hs_lang') || (navigator.language.startsWith('zh') ? 'zh-CN' : 'en');

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('hs_lang', lang);
  const dict = I18N[lang];
  document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // 标题特殊处理（两段渐变）
  const h1 = document.querySelector('.hero-title');
  if (h1) {
    h1.innerHTML = `${dict.heroTitle1}<br><span class="grad">${dict.heroTitle2}</span>`;
  }

  // 语言切换按钮显示目标语言
  document.getElementById('langToggle').textContent = lang === 'zh-CN' ? 'EN' : '中文';

  // 更新剩余额度文案
  updateQuotaUI();
}

function t(key, vars) {
  let s = I18N[currentLang][key] || I18N['zh-CN'][key] || key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      s = s.replace(`{${k}}`, v);
    });
  }
  return s;
}
