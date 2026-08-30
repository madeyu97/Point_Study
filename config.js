/* ═══════════════════════════════════════════════════════════
   POINT STUDY — your settings

   Edit this file ONCE. App updates replace index.html and sw.js,
   never this file, so your keys stay put.

   Both values below are meant to be public — they are safe in
   client code. The security is in the database rules, not in
   hiding these. Never put the service_role key here.

   Find them in Supabase → Project Settings → API.
   ═══════════════════════════════════════════════════════════ */

window.CONFIG = {

  // Supabase → Project Settings → API → Project URL
  SUPABASE_URL: 'https://sbaekrboqpfgcdxuzqnu.supabase.co',

  // Supabase → Project Settings → API → anon / public key (the long one)
  SUPABASE_ANON: 'sb_publishable_STw2NouLZphaCpPZOqnXKQ_SEnfzRRN',


  /* ── Legal ──────────────────────────────────────────────
     The app carries a plain-English privacy summary in
     Settings regardless. Fill these in once you have
     published the full documents and the app will link to
     them; leave them empty and the links are simply hidden. */

  // Where you published PRIVACY-AND-TERMS.md
  PRIVACY_URL: 'https://point-study.netlify.app/privacy.html',
  TERMS_URL: 'https://point-study.netlify.app/terms.html',

  // Shown as the address to write to for data deletion
  CONTACT_EMAIL: 'mattjgibb.97@gmail.com'

};

/* Leave both empty and the app runs offline-only: studying works,
   sync and colleagues stay hidden. Fill them in and everything
   switches on. */
