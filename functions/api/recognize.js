/**
 * 手写扫描通 - API 代理
 * 路由: /api/recognize
 * 职责: 接收前端 base64 图片 → 调 CZC Token (gpt-5.6-luna) → 返回结构化结果
 * 注意: CZC_API_KEY 存在 Pages secret / .dev.vars，绝不进前端
 */

// 简单 IP 限流（内存 KV：每天每 IP 20 次）
const DAILY_LIMIT = 20;
const rateStore = new Map();

function getDateStr() {
  return new Date().toISOString().slice(0, 10);
}

function checkRate(ip) {
  const today = getDateStr();
  const key = `${ip}:${today}`;
  const count = rateStore.get(key) || 0;
  if (count >= DAILY_LIMIT) return false;
  rateStore.set(key, count + 1);
  // 清理过期（保留最近 3 天）
  if (rateStore.size > 10000) {
    for (const [k, v] of rateStore) {
      if (!k.endsWith(today)) rateStore.delete(k);
    }
  }
  return true;
}

const SYSTEM_PROMPT = `你是一个中文手写文档识别助手。用户会上传手写笔记、板书、表单、单据或白板的照片。

你的任务：
1. 完整识别图片中的所有手写文字内容，不遗漏
2. 理解并保留文档结构：标题层级、有序/无序列表、TODO(勾选框)、表格、段落
3. 如果是表单（有字段标签+手写值），输出为字段键值对
4. 输出严格为 JSON，结构如下：
{
  "fields": [
    {"label": "字段名或标题", "value": "内容", "confidence": "high|low", "note": "仅当confidence=low时说明不确定原因"}
  ],
  "table": [["列1","列2"],["值1","值2"]],
  "markdown": "完整的Markdown格式文本，包含所有内容",
  "summary": "一句话说明这是什么文档"
}

规则：
- 手写内容不确定时 confidence 必须标 low 并写 note，绝不猜测
- 空白字段 value 写空字符串
- 保留原文语言，不要翻译
- markdown 必须完整，字段/表格都包含在内
- 表格用 markdown 表格语法，同时填充 table 数组
- 如果整张图没有文字，fields 返回空数组，markdown 写"[未能识别到文字]"`;

export async function onRequest(context) {
  // CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // 限流（按 IP）
  const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
  if (!checkRate(ip)) {
    return new Response(JSON.stringify({ ok: false, error: 'quota_exceeded' }), {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await context.request.json();
    const { image_base64 } = body;

    if (!image_base64 || image_base64.length < 100) {
      return new Response(JSON.stringify({ ok: false, error: 'missing image' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 图片大小限制：base64 不超过 12MB（前端已压缩到 ~2MB）
    if (image_base64.length > 12 * 1024 * 1024) {
      return new Response(JSON.stringify({ ok: false, error: 'image too large' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const apiKey = context.env.CZC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ ok: false, error: 'server not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 调 CZC Token
    const apiResp = await fetch('https://api.czctoken.online/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-5.6-luna',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              { type: 'text', text: '请识别这张手写图片并输出 JSON。' },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${image_base64}` } }
            ]
          }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 4000,
        temperature: 0.1
      })
    });

    if (!apiResp.ok) {
      const errText = await apiResp.text();
      console.error('CZC Token API error:', apiResp.status, errText.slice(0, 300));
      return new Response(JSON.stringify({ ok: false, error: 'upstream error' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const apiData = await apiResp.json();
    const content = apiData?.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(JSON.stringify({ ok: false, error: 'empty upstream response' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 解析 JSON（模型可能包裹 ```json）
    let result;
    try {
      const cleaned = content.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      result = JSON.parse(cleaned);
    } catch (e) {
      console.error('JSON parse failed:', content.slice(0, 200));
      return new Response(JSON.stringify({ ok: false, error: 'parse error' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ ok: true, result }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('recognize error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
