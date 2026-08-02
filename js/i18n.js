/* 手写扫描通 - 中英语言切换 */
const I18N = {
  'zh-CN': {
    brand: '手写扫描通',
    heroBadge: 'AI 手写识别 · 免费 · 免登录',
    heroTitle1: '把每一页手写，',
    heroTitle2: '变成可编辑的结构化文档',
    heroSub: '拍下笔记、板书、单据或白板，AI 自动识别内容与结构 —— 输出 Markdown、Excel、CSV，不确定的地方高亮让你确认。',
    quotaLabel: '今日剩余',
    quotaUnit: '次',
    dropTitle: '拖拽照片到这里，或点击上传',
    dropSub: '支持 JPG / PNG / PDF · 手写笔记、表单、白板均可',
    reset: '重新上传',
    recognize: '开始识别',
    scanning: '正在识别手写内容…',
    scanStep1: '读取图片',
    scanStep2: '识别文字与结构',
    scanStep3: '整理为结构化文档',
    resultTitle: '识别结果',
    confirmHint: '⚠ 不确定的内容已高亮，点击可直接修改',
    mdPreview: 'Markdown 源码（可编辑）',
    copy: '复制',
    downloadMd: 'Markdown',
    downloadCsv: 'CSV',
    downloadXlsx: 'Excel',
    downloadTxt: 'TXT',
    copySuccess: '已复制到剪贴板',
    quotaExhausted: '今日免费额度已用完，明天再来吧',
    quotaLeft: '今日剩余 {n} 次免费识别',
    errorNoFile: '请先选择图片',
    errorUpload: '上传失败，请重试',
    errorNetwork: '识别服务暂时不可用，请稍后再试',
    errorQuota: '今日免费额度已用完',
    howTitle: '三步完成',
    step1Title: '拍照上传',
    step1Desc: '拍下手写笔记、表单或白板，拖进页面即可',
    step2Title: 'AI 识别结构',
    step2Desc: '自动识别标题、列表、表格、待办，输出结构化内容',
    step3Title: '确认导出',
    step3Desc: '修改不确定处，一键导出 Markdown / Excel / CSV',
    faqTitle: '常见问题',
    faq1Q: '识别准确吗？',
    faq1A: '基于 GPT-5.6 视觉模型，对中文手写识别效果好。拿不准的地方会用黄色高亮标出，你可以直接点击修改后再导出。',
    faq2Q: '我的图片会保存吗？',
    faq2A: '不会。图片仅用于本次识别，识别完成后即丢弃，服务器不留存任何文件。',
    faq3Q: '免费额度是多少？',
    faq3A: '每个设备每天 20 次免费识别，无需注册登录。',
    footerNote: '✍️ 手写扫描通 · 隐私优先：图片不留存 · 免费工具',
    previewLabel: '预览',
    processing: '处理中…'
  },
  'en': {
    brand: 'HandWriteScan',
    heroBadge: 'AI Handwriting OCR · Free · No Sign-up',
    heroTitle1: 'Turn every handwritten page',
    heroTitle2: 'into editable structured documents',
    heroSub: 'Photograph notes, boards, forms or whiteboards — AI extracts content and structure, outputting Markdown, Excel, CSV. Uncertain areas are highlighted for your confirmation.',
    quotaLabel: 'Left today',
    quotaUnit: '',
    dropTitle: 'Drag a photo here, or click to upload',
    dropSub: 'JPG / PNG / PDF · Notes, forms, whiteboards',
    reset: 'Re-upload',
    recognize: 'Recognize',
    scanning: 'Recognizing handwriting…',
    scanStep1: 'Reading image',
    scanStep2: 'Extracting text & structure',
    scanStep3: 'Building structured document',
    resultTitle: 'Recognition Result',
    confirmHint: '⚠ Uncertain items are highlighted — click to edit',
    mdPreview: 'Markdown source (editable)',
    copy: 'Copy',
    downloadMd: 'Markdown',
    downloadCsv: 'CSV',
    downloadXlsx: 'Excel',
    downloadTxt: 'TXT',
    copySuccess: 'Copied to clipboard',
    quotaExhausted: 'Daily free quota used up — come back tomorrow',
    quotaLeft: '{n} free scans left today',
    errorNoFile: 'Please select an image first',
    errorUpload: 'Upload failed, please retry',
    errorNetwork: 'Recognition service unavailable, try again later',
    errorQuota: 'Daily free quota used up',
    howTitle: 'Three steps',
    step1Title: 'Upload a photo',
    step1Desc: 'Photograph your notes, forms or whiteboard and drag them in',
    step2Title: 'AI extracts structure',
    step2Desc: 'Detects headings, lists, tables, todos and outputs structured content',
    step3Title: 'Confirm & export',
    step3Desc: 'Edit uncertain items, export to Markdown / Excel / CSV in one click',
    faqTitle: 'FAQ',
    faq1Q: 'How accurate is it?',
    faq1A: 'Built on GPT-5.6 vision model with strong Chinese handwriting recognition. Uncertain spots are highlighted in yellow — click to edit before exporting.',
    faq2Q: 'Are my images stored?',
    faq2A: 'No. Images are used only for the current recognition and discarded immediately — nothing is stored on servers.',
    faq3Q: 'What is the free quota?',
    faq3A: '20 free recognitions per device per day. No registration needed.',
    footerNote: '✍️ HandWriteScan · Privacy first: images never stored · Free tool',
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
