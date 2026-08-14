# 图片转Excel Img2Excel

把表格图片（截图、拍照、扫描件、PDF）一键转成可编辑的 Excel/CSV。副功能：手写转文字。

- 线上：https://scan.czcai.cc/（主页=图片转Excel；子页 /handwriting.html=手写转文字）
- 仓库：github.com/czc6666/handwriting-scan
- 前端：Cloudflare Pages 静态站（纯 HTML/CSS/JS，无框架）
- 后端：Pages Functions 代理 → CZC Token API（gpt-5.6-luna，表格优先 prompt）
- 免费额度：每设备每天 20 次（前端 localStorage + 服务端 IP 双限流；不显示额度，用尽才提示）
- 免登录，隐私优先（图片不留存）
- 中英切换、浅色/深色双主题、v3 现代视觉

## 定位演进

v1 手写扫描通（OCR 泛化）→ v2 手写转表格/结构化 → **v3 图片转Excel（聚焦表格，手写降为子页）**

## 目录结构

```
index.html              主页：图片转Excel（表格优先）
handwriting.html        子页：手写转文字
css/style.css           v3 设计系统（双主题 + 光晕 + 使用场景卡片）
js/i18n.js              主页语言包
js/i18n-handwriting.js  子页语言包
js/app.js               共享识别/导出逻辑
functions/api/recognize.js  Pages Function（表格优先 prompt + 限流）
```

## 导出格式（全部真实）

| 格式 | 实现 |
|---|---|
| Excel (.xlsx) | SheetJS 生成（结果页主按钮） |
| CSV | 前端拼 CSV（带 BOM） |
| Markdown | 模型 markdown 字段 |
| Word (.docx) | docx.js 解析 Markdown→Word 结构 |
| TXT | 纯文本 |

## 本地开发

```bash
npm install
# .dev.vars 里填 CZC_API_KEY
npx wrangler pages dev . --port 8790 --ip 127.0.0.1 --compatibility-date=2026-08-06
```

> 注意：本地 workerd 二进制可能不支持"今天"的 compatibility_date，需显式指定一个旧日期（如 2026-08-06），否则报 "requires compatibility date X, but newest supported is Y"。

## 部署

```bash
npx wrangler pages deploy . --project-name handwriting-scan
```

## 已知边界
- gpt-5.6-luna 单张 ~2300 tokens；DeepSeek V4 Flash 不支持图片
- 识别 ~20 秒；低置信字段（金额/日期/数字）黄色高亮让用户确认
- 服务端限流为内存 Map（Pages 免费版无 KV），重启后重置
- PDF 输入：前端接受但后端只处理 base64 图片，PDF 会失败（待修）
