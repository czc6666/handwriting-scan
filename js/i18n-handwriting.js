/* 手写转文字（子页）- 中英语言切换 */
const I18N = {
  'zh-CN': {
    brand: '手写转文字',
    handwritingLink: '图片转Excel',
    heroBadge: 'AI 手写识别 · 免费 · 免登录',
    heroTitle1: '手写转文字 · 笔记一键数字化',
    heroTitle2: '手写笔记、板书 → 可编辑文本',
    heroSub: '上传手写笔记、板书、便利贴的照片，AI 识别文字并保留标题、列表、待办结构，导出 Markdown / Word / TXT。',
    quotaLabel: '今日剩余',
    quotaUnit: '次',
    dropTitle: '拖拽手写笔记照片到这里，或点击上传',
    dropSub: '支持 JPG / PNG / PDF · 手写笔记、板书、便利贴均可',
    reset: '重新上传',
    recognize: '开始识别',
    scanning: '正在识别手写内容…',
    scanStep1: '读取图片',
    scanStep2: '识别文字与结构',
    scanStep3: '整理为文档',
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
    quotaLeft: '今日剩余 {n} 次免费识别',
    errorNoFile: '请先选择图片',
    errorUpload: '上传失败，请重试',
    errorNetwork: '识别服务暂时不可用，请稍后再试',
    errorQuota: '今日免费额度已用完',
    howTitle: '手写转文字，三步完成',
    step1Title: '拍照上传',
    step1Desc: '拍下手写笔记、板书或便利贴，拖进页面即可',
    step2Title: 'AI 手写识别',
    step2Desc: '自动识别文字、标题层级、列表和待办',
    step3Title: '导出文档',
    step3Desc: '修改不确定处，一键导出 Markdown / Word / TXT',
    faqTitle: '常见问题',
    faq1Q: '手写笔记怎么转成文字？免费吗？',
    faq1A: '上传手写笔记的照片，AI 自动识别文字和结构，导出可编辑文本。完全免费，无需登录，每个设备每天 20 次免费识别。',
    faq2Q: '手写识别准确吗？',
    faq2A: '基于 GPT-5.6 视觉模型，对中文手写识别效果好。拿不准的地方会用黄色高亮标出，可以点击修改后再导出。',
    faq3Q: '支持手写表格吗？',
    faq3A: '支持。如果手写内容里有表格（账本、课表、登记表），建议用我们的图片转 Excel 工具，表格识别效果更好。',
    faq4Q: '能识别英文手写吗？',
    faq4A: '可以。支持中英文及多语言手写识别，英文笔记、课堂笔记、会议记录都能转成可编辑文本。',
    faq5Q: '上传的图片会保存吗？',
    faq5A: '不会。图片仅用于本次识别，完成后立即丢弃，服务器不留存任何文件，隐私优先。',
    faq6Q: '手机和电脑都能用吗？',
    faq6A: '都可以，浏览器直接打开就能用，无需下载 app。免费额度第二天自动恢复。',
    footerNote: '✍️ 手写转文字 · 免费手写识别/手写笔记转文字在线工具 · 图片不留存',
    previewLabel: '预览',
    processing: '处理中…'
  },
  'en': {
    brand: 'Handwriting → Text',
    handwritingLink: 'Image to Excel',
    heroBadge: 'AI Handwriting OCR · Free · No Sign-up',
    heroTitle1: 'Handwriting to text · Digitalize notes',
    heroTitle2: 'Handwritten notes, boards → editable text',
    heroSub: 'Upload photos of handwritten notes, boards or sticky notes. AI extracts text while preserving headings, lists and todos. Export to Markdown / Word / TXT.',
    quotaLabel: 'Left today',
    quotaUnit: '',
    dropTitle: 'Drag a handwritten note here, or click to upload',
    dropSub: 'JPG / PNG / PDF · Notes, boards, sticky notes',
    reset: 'Re-upload',
    recognize: 'Recognize',
    scanning: 'Recognizing handwriting…',
    scanStep1: 'Reading image',
    scanStep2: 'Extracting text & structure',
    scanStep3: 'Building document',
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
    quotaLeft: '{n} free scans left today',
    errorNoFile: 'Please select an image first',
    errorUpload: 'Upload failed, please retry',
    errorNetwork: 'Recognition service unavailable, try again later',
    errorQuota: 'Daily free quota used up',
    howTitle: 'Handwriting to text in 3 steps',
    step1Title: 'Upload a photo',
    step1Desc: 'Photograph notes, boards or sticky notes and drag them in',
    step2Title: 'AI handwriting recognition',
    step2Desc: 'Detects text, heading levels, lists and todos',
    step3Title: 'Export document',
    step3Desc: 'Edit uncertain items, export to Markdown / Word / TXT',
    faqTitle: 'FAQ',
    faq1Q: 'How do I convert handwriting to text? Free?',
    faq1A: 'Upload a photo of your handwriting — AI extracts text and structure, export editable text. Free, no sign-up, 20 free scans per device per day.',
    faq2Q: 'How accurate is handwriting recognition?',
    faq2A: 'Built on the GPT-5.6 vision model, it handles Chinese handwriting very well. Uncertain items are highlighted in yellow — click to edit before exporting.',
    faq3Q: 'Does it support handwritten tables?',
    faq3A: 'Yes. For handwritten tables (ledgers, schedules, forms), try our image-to-Excel tool for better table recognition.',
    faq4Q: 'Does it recognize English handwriting?',
    faq4A: 'Yes. Multi-language handwriting to text — English notes, class notes and meeting notes convert to editable text.',
    faq5Q: 'Are my uploaded images stored?',
    faq5A: 'No. Images are used only for the current conversion and discarded immediately. Nothing stored, no accounts, privacy first.',
    faq6Q: 'Works on mobile and desktop?',
    faq6A: 'Yes, both. Open in any browser, no app download. Free quota resets the next day.',
    footerNote: '✍️ Handwriting to Text · Free handwriting recognition online tool · Images never stored',
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

  const h1 = document.querySelector('.hero-title');
  if (h1) {
    h1.innerHTML = `${dict.heroTitle1}<br><span class="grad">${dict.heroTitle2}</span>`;
  }

  document.getElementById('langToggle').textContent = lang === 'zh-CN' ? 'EN' : '中文';
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
