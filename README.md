# 手写扫描通 (HandWriteScan)

上传手写笔记/板书/单据照片 → AI 识别为结构化 Markdown/Excel/CSV → 不确定内容高亮确认 → 导出。

- 前端：Cloudflare Pages 静态站（纯 HTML/CSS/JS，无框架）
- 后端：Pages Functions 代理 → CZC Token API（gpt-5.6-luna）
- 免费额度：每设备每天 20 次（localStorage 前端计数 + CF-Connecting-IP 服务端限流）
- 免登录，隐私优先（图片不留存）
- 中英切换、浅色/深色双主题

## 目录结构

```
index.html          主页面（中英 data-i18n）
css/style.css       设计系统（双主题 + 动效）
js/i18n.js          语言包 + 切换
js/app.js           上传/压缩/识别/渲染/导出
functions/api/recognize.js  Pages Function 代理（限流 + 调 CZC Token）
```

## 本地开发

```bash
npm install
# .dev.vars 里填 CZC_API_KEY
npm run dev          # http://127.0.0.1:8788
```

## 部署

```bash
npm run deploy
# 或 git push 触发 Cloudflare Pages CI
# 线上环境变量：CZC_API_KEY（Pages -> Settings -> Environment variables）
```

## API 接口

POST /api/recognize
```json
{
  "image_base64": "<jpeg base64>"
}
```
返回：
```json
{
  "ok": true,
  "result": {
    "fields": [{"label":"工程名称","value":"...","confidence":"high"}],
    "table": [["列1","列2"]],
    "markdown": "# ...",
    "summary": "..."
  }
}
```
- 429 = 当日额度用完
- 500/502 = 上游或内部错误

## 已核验

- 2026-08-02 真实工程表单识别验证：结构输出正确，关键数字识别可靠（见 product-research-2026Q3 项目）
- deepseek-v4-flash 不支持图片输入（400），免费额度走 gpt-5.6-luna（~2300 tokens/张）
