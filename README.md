# 手写扫描通 (HandWriteScan) v2

上传手写笔记/板书/单据照片 → AI 识别为结构化 Markdown/Word/Excel/CSV → 不确定内容高亮确认 → 导出。

- 线上：https://scan.czcai.cc（已挂个人主页 https://czcai.cc 产品卡第一位）
- 仓库：github.com/czc6666/handwriting-scan
- 前端：Cloudflare Pages 静态站（纯 HTML/CSS/JS，无框架）
- 后端：Pages Functions 代理 → CZC Token API（gpt-5.6-luna）
- 免费额度：每设备每天 20 次（localStorage 前端 + CF-Connecting-IP 服务端双限流；**不显示剩余额度，用尽才提示**）
- 免登录，隐私优先（图片不留存）
- 中英切换、浅色/深色双主题、v2 现代视觉（光晕背景/扫描动画/微动效）

## 目录结构

```
index.html          主页面（中英 data-i18n + SEO 全套）
css/style.css       v2 设计系统（双主题 + 光晕 + 动效）
js/i18n.js          语言包 + 切换
js/app.js           上传/压缩/识别/渲染/导出（含 docx 导出）
functions/api/recognize.js  Pages Function 代理（限流 + 调 CZC Token）
SEO-OPTIMIZATION.md SEO 优化记录
VERIFICATION.md     验证记录
```

## 导出格式（全部真实）

| 格式 | 实现 |
|---|---|
| Markdown | 模型 markdown 字段直接下载 |
| Word (.docx) | docx.js 解析 Markdown→Word 原生结构（标题/列表/表格），真 zip docx |
| CSV | 前端拼 CSV（带 BOM，Excel 不乱码） |
| Excel (.xlsx) | SheetJS 生成 |
| TXT | 纯文本 |

## 本地开发

```bash
npm install
# .dev.vars 里填 CZC_API_KEY
npm run dev          # http://127.0.0.1:8788
```

## 部署

```bash
npm run deploy
# 线上环境变量：CZC_API_KEY（Pages -> Settings -> Environment variables）
```

## API

POST /api/recognize `{"image_base64":"<jpeg base64>"}`
返回 `{ok, result: {fields[], table[], markdown, summary}}`
- 429 = 当日额度用完

## 已知边界
- gpt-5.6-luna 单张 ~2300 tokens；DeepSeek V4 Flash 不支持图片（400）
- 识别 ~20 秒；真实潦草手写准确率非 100%，低置信字段高亮让用户确认
- 服务端限流为内存 Map（Pages 免费版无 KV 持久化），重启后重置；后续可加 KV
