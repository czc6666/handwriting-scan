# 手写扫描通 - 本地验证记录（2026-08-02）

## 环境
- 本地：wrangler pages dev :8788，CZC_API_KEY 注入 .dev.vars
- API：CZC Token gpt-5.6-luna（response_format json_object）

## 验证结果（全部通过）

| 项目 | 结果 |
|---|---|
| 首页加载 | ✅ 200，无 JS 错误 |
| 中英切换 | ✅ 点击"中文"→全站中文；按钮变 EN；localStorage 持久化 |
| 深色主题 | ✅ 深色背景+层级分明，渐变强调色在深色下出彩 |
| 浅色主题 | ✅ 默认浅色，米白底+紫粉渐变 |
| 上传/拖拽 | ✅ 注入文件后预览正常 |
| Canvas 压缩 | ✅ 浏览器本地压缩 |
| API 代理 | ✅ POST /api/recognize → Luna → 结构化 JSON |
| 识别耗时 | ✅ ~24 秒（含 API 调用） |
| 字段渲染 | ✅ 6 字段 + OK 徽章 |
| Markdown 输出 | ✅ 完整，含标题/列表/TODO/表格 |
| CSV 导出 | ✅ blob 下载 handwriting.csv |
| MD 导出 | ✅ blob 下载 handwriting.md |
| 手机响应式 | ✅ 375px 单列、无溢出、额度胶囊隐藏 |
| 限流 | ✅ 服务端 CF-Connecting-IP 每日 20 次 + 前端 localStorage |

## 已知优化点（非阻塞）
- 深色模式辅助文字对比度可再提亮（小修）
- FAQ 加号颜色偏淡
- 低置信字段本次识别全为 high（逻辑正常，需真实潦草样本验证黄色高亮路径）
- 移动端字段确认区布局已调（375px 单列）

## 待部署
- Cloudflare Pages 项目 + CZC_API_KEY secret
- 绑定独立子域（待定 scan.czcai.cc）
