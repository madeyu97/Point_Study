// netlify/functions/tutor.js
// Server-side proxy to Google Gemini. The API key lives ONLY in the Netlify
// environment variable GEMINI_API_KEY — it is never sent to the browser.
const MODEL = 'gemini-flash-latest';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'POST only' }) };

  const key = process.env.GEMINI_API_KEY;
  if (!key) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Tutor not configured (GEMINI_API_KEY is not set on the site).' }) };

  if ((event.body || '').length > 24000) return { statusCode: 413, headers, body: JSON.stringify({ error: 'payload too large' }) };
  let req; try { req = JSON.parse(event.body || '{}'); } catch { return { statusCode: 400, headers, body: JSON.stringify({ error: 'invalid JSON' }) }; }

  let prompt, temperature;
  if (req.mode === 'vignette') {
    const pts = (req.points || []).slice(0, 60).map(p =>
      `${p.pinyin} (${p.code}, ${p.channel})${p.roles && p.roles.length ? ' [' + p.roles.join(', ') + ']' : ''}: ${(p.functions || []).slice(0, 3).join('; ')}`
    ).join('\n');
    temperature = 1.0;
    prompt =
`You are an experienced TCM acupuncture tutor writing a study exercise.
Using ONLY the acupuncture points listed below, write a short, realistic patient vignette (3-4 sentences) whose most appropriate treatment uses 2 to 4 of them.
Do NOT name any points or reveal the answer inside the vignette.
Return ONLY minified JSON (no markdown, no code fence) with exactly these keys:
"vignette" (string), "points" (array of the chosen point codes exactly as written below, e.g. ["LR 3","SP 6"]), "teaching" (one sentence on why those points fit).

POINTS:
${pts}`;
  } else if (req.mode === 'feedback') {
    temperature = 0.6;
    prompt =
`You are a Socratic TCM acupuncture tutor helping a student reason through point selection.
VIGNETTE: "${String(req.vignette || '').slice(0, 1400)}"
MODEL POINTS: ${(req.points || []).join(', ')}
TEACHING NOTE: ${String(req.teaching || '').slice(0, 400)}
STUDENT'S REASONING: "${String(req.reasoning || '').slice(0, 1600)}"
Give brief, encouraging, Socratic feedback (max 120 words): affirm what is sound, name the single most important gap or refinement, and ask ONE guiding question. Do not simply list the full answer unless the student is essentially correct. Plain prose only — no markdown, no headings.`;
  } else {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'unknown mode' }) };
  }

  try {
    const r = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-goog-api-key': key },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature, maxOutputTokens: 700 }
      })
    });
    const data = await r.json();
    if (!r.ok) return { statusCode: 502, headers, body: JSON.stringify({ error: 'Gemini API error', detail: data && data.error ? data.error.message : data }) };
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return { statusCode: 200, headers, body: JSON.stringify({ text }) };
  } catch (e) {
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'Upstream request failed', detail: String(e) }) };
  }
};
