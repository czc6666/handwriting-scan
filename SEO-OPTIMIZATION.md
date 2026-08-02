# 手写扫描通 SEO 优化记录（2026-08-02 v2）

## 需求
老板指出网站关键词太少，要求专门一轮 SEO 优化：
- Title 放最核心关键词
- Description 列常见关键词
- FAQ 放所有其他关键词
- 要求先调研真实关键词，不能敷衍

## 调研方法
搜索引擎页面被反爬拦截（Bing Cloudflare 验证），改用**搜索建议 API**：
- Bing Autosuggest API (api.bing.com/osjson.aspx)
- Google Suggest API (suggestqueries.google.com)
- 22 个种子词 × 建议词 = **130+ 真实用户搜索词**
- 完整词表见 `product-research-2026Q3/02-研究与审计/09-seo-keywords.md`

## 关键词簇
1. 核心主词：手写识别 / 手写转文字 / 手写OCR / 图片转文字 / handwriting to text
2. 场景词：手写笔记转文字 / 拍照识别文字 / 扫描件转文字 / 手写转Word / 照片转文字
3. 长尾词：手写识别在线/免费/软件/api / 手写OCR模型 / 图片转文字免费 / 手写体识别

## 落位设计
| 位置 | 内容 |
|---|---|
| Title | 手写识别在线免费 - 手写转文字工具 \| 手写扫描通（核心主词+品牌） |
| Description | 手写识别/手写转文字/手写OCR/图片转文字/拍照识别/手写转Word/Excel/Markdown/中文手写识别/免费/无需登录 全埋 |
| keywords meta | 12 个中英文关键词 |
| H1 | 手写识别在线免费工具 / 手写笔记一键转文字 |
| hero-tags | 7 个关键词胶囊标签（手写识别/手写转文字/图片转文字/手写笔记转文字/拍照识别文字/手写OCR/导出Word/Excel/Markdown） |
| 三步区 H2 | 手写笔记转文字，三步完成（步骤文案也埋词） |
| FAQ | 3 条 → **8 条**，每条 Q 就是一组搜索词（手写识别是什么/图片转文字/手写转Word/Excel/中文手写识别准确吗/手写体识别和手写OCR区别/英文手写/额度） |
| Footer | 手写识别/手写转文字/图片转文字在线工具 |
| 结构化数据 | JSON-LD WebApplication（名称/描述/功能列表含 10 个关键词）+ og:title + canonical |

## 验证
- 关键词密度：手写识别 24 次、手写转文字 7 次、图片转文字 10 次、手写笔记 14 次、免费 20 次（健康不过度）
- 本地浏览器：H1/标签/FAQ 视觉正常，无错位
- 线上独立 profile：Title/Description/keywords/JSON-LD/H1/hero-tags/FAQ 8条 全部确认生效
- 中英双语：i18n.js 同步更新，EN 版同样埋英文关键词

## 关键文件
- index.html（Title/Description/Keywords/OG/JSON-LD/H1/hero-tags/三步/FAQ/Footer）
- js/i18n.js（中英文案+关键词）
- css/style.css（hero-tags 样式）
