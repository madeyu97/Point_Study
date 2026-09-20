// netlify/functions/activate.js
//
// Verifies a Gumroad licence key and records it against the signed-in user.
//
// Why this runs on a server rather than in the app: the app is a static file
// that anyone can read and edit. A licence check written in the app can simply
// be deleted. This function holds the Supabase SERVICE ROLE key, which is the
// only credential allowed to write to the `licences` table, and the database
// rules require a licence row before any of the user's data can be stored.
// So skipping the check in the app achieves nothing — Supabase refuses.
//
// Environment variables required (Netlify → Site configuration → Environment):
//   GUMROAD_PRODUCT_ID          from your Gumroad product's licence settings
//   SUPABASE_URL                same value the app uses
//   SUPABASE_SERVICE_ROLE_KEY   Supabase → Settings → API → service_role. SECRET.
//                               Never put this in index.html.

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return json(204, {});
  if (event.httpMethod !== 'POST') return json(405, { error: 'POST only' });

  const PRODUCT_ID = process.env.GUMROAD_PRODUCT_ID;
  const SB_URL = process.env.SUPABASE_URL;
  const SB_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!PRODUCT_ID || !SB_URL || !SB_SERVICE) {
    return json(500, { error: 'Licensing is not configured on this site.' });
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return json(400, { error: 'Bad request.' }); }

  const licenceKey = String(body.licence || '').trim();
  const token = (event.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!licenceKey) return json(400, { error: 'Enter your licence key.' });
  if (!token) return json(401, { error: 'Sign in first, then activate.' });

  // 1. Who is asking? Ask Supabase to validate their session token.
  let user;
  try {
    const r = await fetch(SB_URL + '/auth/v1/user', {
      headers: { apikey: SB_SERVICE, Authorization: 'Bearer ' + token }
    });
    user = await r.json();
    if (!r.ok || !user || !user.id) return json(401, { error: 'Your session has expired — sign in again.' });
  } catch (e) {
    return json(502, { error: 'Could not check your session.' });
  }

  // 2. Is the licence real? Ask Gumroad.
  //    increment_uses_count is deliberately false: we count activations
  //    ourselves below, so re-checking an existing licence is free.
  let g;
  try {
    const form = new URLSearchParams();
    form.append('product_id', PRODUCT_ID);
    form.append('license_key', licenceKey);
    form.append('increment_uses_count', 'false');
    const r = await fetch('https://api.gumroad.com/v2/licenses/verify', { method: 'POST', body: form });
    g = await r.json();
    if (!r.ok || !g.success) return json(403, { error: 'That licence key was not recognised.' });
  } catch (e) {
    return json(502, { error: 'Could not reach Gumroad. Try again shortly.' });
  }

  // 3. Refunded, chargebacked or cancelled purchases are not valid licences.
  const p = g.purchase || {};
  if (p.refunded || p.chargebacked || p.disputed) {
    return json(403, { error: 'That purchase was refunded or disputed.' });
  }
  if (p.subscription_cancelled_at || p.subscription_failed_at) {
    return json(403, { error: 'That subscription is no longer active.' });
  }

  // 4. Seat limit: how many DIFFERENT people have used this key?
  //    Gumroad's own counter cannot tell devices apart, so we count distinct
  //    users ourselves. The same person re-activating is always allowed.
  const SEATS = Number(process.env.LICENCE_SEATS || 3);
  const sb = (path, opts = {}) => fetch(SB_URL + '/rest/v1/' + path, {
    ...opts,
    headers: {
      apikey: SB_SERVICE,
      Authorization: 'Bearer ' + SB_SERVICE,
      'Content-Type': 'application/json',
      ...(opts.headers || {})
    }
  });

  try {
    const r = await sb('licences?select=user_id&licence_key=eq.' + encodeURIComponent(licenceKey));
    const rows = await r.json();
    const others = (rows || []).filter(x => x.user_id !== user.id);
    if (others.length >= SEATS) {
      return json(403, { error: `This licence is already in use on ${SEATS} accounts.` });
    }
  } catch (e) {
    return json(502, { error: 'Could not check the licence. Try again shortly.' });
  }

  // 5. Record it. Only this function can write here.
  try {
    const r = await sb('licences?on_conflict=user_id', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({
        user_id: user.id,
        licence_key: licenceKey,
        email: p.email || null,
        activated_at: new Date().toISOString()
      })
    });
    if (!r.ok) {
      const detail = await r.text();
      return json(502, { error: 'Could not save your licence.', detail });
    }
  } catch (e) {
    return json(502, { error: 'Could not save your licence.' });
  }

  return json(200, { ok: true, email: p.email || null });
};
