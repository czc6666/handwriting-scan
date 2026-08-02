/* 手写扫描通 - 中英语言切换 */
const I18N = {
  'zh-CN': {
    brand: '手写扫描通',
    heroBadge: 'AI 手写识别 · 免费 · 免登录',
    heroTitle1: '手写识别在线免费工具',
    heroTitle2: '手写笔记一键转文字',
    heroSub: '免费手写识别（手写OCR）在线工具：拍下手写笔记、板书、单据，AI 自动识别文字与结构，图片转文字、拍照识别文字，导出 Markdown / Excel / CSV，不确定处高亮确认。',
    quotaLabel: '今日剩余',
    quotaUnit: '次',
    dropTitle: '拖拽照片到这里，或点击上传',
    dropSub: '支持 JPG / PNG / PDF · 手写笔记、表单、白板、扫描件均可',
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
    downloadWord: 'Word',
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
    howTitle: '手写笔记转文字，三步完成',
    step1Title: '拍照上传',
    step1Desc: '拍下手写笔记、表单或白板，拖进页面即可，手机拍照识别文字也行',
    step2Title: 'AI 手写识别',
    step2Desc: '自动识别标题、列表、表格、待办，输出结构化内容（手写OCR）',
    step3Title: '确认导出',
    step3Desc: '修改不确定处，一键导出 Markdown / Word / Excel / CSV',
    faqTitle: '常见问题',
    faq1Q: '手写识别是什么？在线免费手写转文字怎么用？',
    faq1A: '手写识别（Handwriting OCR）是用 AI 把手写内容自动转成电子文字的技术。使用方法很简单：拍下或上传手写笔记、板书、单据照片，AI 自动识别文字和结构，输出可编辑的文本，全程免费无需登录。',
    faq2Q: '支持图片转文字吗？手写笔记、照片、扫描件都能转吗？',
    faq2A: '都支持。手写笔记照片、板书、白板、纸质单据、扫描件、PDF 都可以一键图片转文字。手机拍照识别文字和电脑上传扫描件识别都可以，纯网页版不用下载软件。',
    faq3Q: '手写能转成 Word / Excel / Markdown 吗？',
    faq3A: '可以。识别结果支持一键导出多种格式：手写转 Word 文本、表格内容转 Excel/CSV、笔记转 Markdown，还有纯 TXT。识别出的标题层级、列表、待办和表格结构都会保留。',
    faq4Q: '中文手写识别准确吗？手写体识别和手写 OCR 有区别吗？',
    faq4A: '中文手写识别基于 GPT-5.6 视觉模型，对汉字手写、手写体识别效果好。手写 OCR 和手写体识别本质是同一件事——都是把手写文字提取成文本。拿不准的内容会用黄色高亮标出，你可以直接点击修改再导出。',
    faq5Q: '需要注册登录吗？手机和电脑都能用吗？',
    faq5A: '完全不需要注册登录。手机、平板、电脑浏览器都能直接用手写识别，无需下载手写识别 app 或安装软件。每天每个设备 20 次免费识别额度。',
    faq6Q: '上传的图片会保存吗？隐私安全吗？',
    faq6A: '不会保存。图片仅用于本次手写文字提取识别，识别完成后立即丢弃，服务器不留存任何文件，也没有用户账号体系，隐私优先。',
    faq7Q: '可以识别英文手写吗？',
    faq7A: '可以。支持中英文及多语言手写识别（handwriting to text），英文笔记、课堂笔记、会议记录都能转成可编辑文本，并支持导出。',
    faq8Q: '识别速度和免费额度有限制吗？',
    faq8A: '单次识别约 20 秒。每个设备每天 20 次免费图片转文字额度，额度用完后第二天自动恢复，无需付费。',
    footerNote: '✍️ 手写扫描通 HandWriteScan · 免费手写识别/手写转文字/图片转文字在线工具 · 图片不留存',
    previewLabel: '预览',
    processing: '处理中…'
  },
  'en': {
    brand: 'HandWriteScan',
    heroBadge: 'AI Handwriting OCR · Free · No Sign-up',
    heroTitle1: 'Free online handwriting recognition',
    heroTitle2: 'Turn handwritten notes into text',
    heroSub: 'Free handwriting OCR online tool: photograph notes, boards or forms — AI extracts text and structure, image to text, export Markdown / Excel / CSV, uncertain areas highlighted.',
    quotaLabel: 'Left today',
    quotaUnit: '',
    dropTitle: 'Drag a photo here, or click to upload',
    dropSub: 'JPG / PNG / PDF · Notes, forms, whiteboards, scans',
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
    downloadWord: 'Word',
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
    howTitle: 'Handwritten notes to text in 3 steps',
    step1Title: 'Upload a photo',
    step1Desc: 'Photograph notes, forms or whiteboard and drag them in — mobile camera works too',
    step2Title: 'AI handwriting recognition',
    step2Desc: 'Detects headings, lists, tables, todos and outputs structured content (handwriting OCR)',
    step3Title: 'Confirm & export',
    step3Desc: 'Edit uncertain items, export to Markdown / Word / Excel / CSV in one click',
    faqTitle: 'FAQ',
    faq1Q: 'What is handwriting recognition / handwriting to text?',
    faq1A: 'Handwriting recognition (handwriting OCR) converts handwritten content into editable digital text using AI. Simply upload a photo of your handwritten notes, whiteboard or forms — AI extracts the text and structure instantly. Free, no sign-up.',
    faq2Q: 'Can I convert images to text? Notes, photos, scans?',
    faq2A: 'Yes. Handwritten notes, whiteboards, paper forms, scanned documents and PDFs all work. Use your phone camera or upload scans from your computer — it is a pure web tool, no app or software download needed.',
    faq3Q: 'Can handwriting be exported to Word / Excel / Markdown?',
    faq3A: 'Yes. Export recognition results to multiple formats: handwriting to text (Word/TXT), tables to Excel/CSV, notes to Markdown. Headings, lists, checkboxes and table structures are preserved.',
    faq4Q: 'Is Chinese handwriting recognition accurate?',
    faq4A: 'Built on the GPT-5.6 vision model, it handles Chinese characters and handwriting OCR very well. Uncertain content is highlighted in yellow — click to edit before exporting.',
    faq5Q: 'Do I need to sign up? Works on mobile and desktop?',
    faq5A: 'No registration needed. Works in any browser on phone, tablet or computer — no handwriting recognition app or software install required. 20 free scans per device per day.',
    faq6Q: 'Are my uploaded images stored? Is it private?',
    faq6A: 'No. Images are used only for the current handwriting-to-text conversion and discarded immediately. Nothing is stored on servers, no accounts, privacy first.',
    faq7Q: 'Does it recognize English handwriting?',
    faq7A: 'Yes. Multi-language handwriting to text — English notes, class notes and meeting notes convert to editable text with export support.',
    faq8Q: 'How fast is it? Free quota limits?',
    faq8A: 'Each recognition takes about 20 seconds. 20 free image-to-text conversions per device per day, resetting automatically the next day.',
    footerNote: '✍️ HandWriteScan · Free handwriting recognition / handwriting to text / image to text online tool · Images never stored',
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
