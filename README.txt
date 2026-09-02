經穴 · Acupoint Dojo  — deployment

DEPLOY: drag this ENTIRE "jingxue" folder onto Netlify Drop (app.netlify.com/drop).
Drop the folder, not the loose files. Once live (https) it installs to the home
screen and runs offline.

WHAT'S NEW IN THIS BUILD
  - Home now splits into two tracks: REVISE (cards due) and LEARN (new points,
    introduced study-first in batches).
  - "Characters" is a separate side-game (not part of point study): meaning quiz,
    radical/component breakdowns, stroke-order animation, and which points use each
    character. Its progress is tracked apart from your point mastery.
  - Settings (設, top right): daily goal, new-points-per-session, sound.

NOTES
  - Progress saves to this device (localStorage); per-device, survives offline.
  - Stroke-order animation loads from a CDN on first use (cached afterwards); if
    fully offline before it has cached, the character still shows, just unanimated.
  - Reset progress: Settings, or the footer "reset" link.

PRIORITY / ORDER OF STUDY (this build)
  - Learn introduces points by a curated clinical tier list (1 Essential -> 5
    Peripheral). Within a tier, command/confluent/Yuan/He-Sea points lead. The 48
    Extra points are untiered in the source, so they default to the bottom.
    Each point shows its tier on the study card.
  - Atlas shows a tier chip per point and a star (☆/★) to PIN points you consider
    essential — pinned points jump to the front of Learn. Atlas can sort by priority.
  - Settings: "Learn order" = Clinical priority / By channel / Random.

BACKUP & RESTORE (new)
  Settings (設) -> Backup & restore:
    - Export file / Copy backup : saves ALL progress (schedule, XP, streak, pins,
      settings) to a file or your clipboard. Do this regularly, and before any
      browser/storage maintenance or phone change.
    - Import file / Paste backup : restores from a saved backup (replaces current
      progress on this device).
  This is the only thing that survives a cleared browser. Keep a copy somewhere safe.

CHANNEL MAP & DIFFERENTIATE (new)
  - Channel Map (經): walk each channel node by node in true order; tap a node to
    reveal it; neighbours sit directly above/below. "Quiz this channel" highlights a
    node and you name it.
  - Differentiate (辨): tell apart look-alike points (e.g. the cluster at the medial
    malleolus) and adjacent points on a channel, with a side-by-side compare table.
  These review alongside everything in Revise, but are *introduced* through their own
  modes (so a generic session won't flood you with them).

CLINICAL CASES (rebuilt — five reasoning demands, offline)
  醫案 — pick a reasoning type on entry, or "All":
    - Multi-constraint : find the one point meeting several constraints at once
    - Odd one out      : spot the point that doesn't share the group's role
    - Build a Rx       : multi-select the points of a pairing / category set
    - Justify A vs B    : choose the right point, then the grounds for it (2 steps)
    - Points -> pattern : name the command role a point (or set) embodies
  All exercises are assembled from the point data (roles, channels, Dui Yao) with no
  invented facts. Own spaced track; earns XP/streak; shown on the Clinical Cases tile.
  (An optional AI tutor layer is planned for later.)

LOCATE POINTS (new) + body-diagram status
  取穴 — recall and WRITE where each point sits, then self-grade; pick a channel or
  drill all by clinical priority. Production practice (harder than recognising) and
  shares the same spaced schedule as location recall.

  Body-diagram "mark the point" / "highlight -> name" is NOT built. A dataset scout
  found no open, embeddable atlas mapping all points to 2D coordinates (AcuSim is
  head/neck-only ML data; NIH's TARA atlas is forthcoming; commercial apps are
  proprietary). Faking pixel positions would teach wrong locations, so it is deferred
  until coordinates are authored in-app or an open atlas (TARA) becomes available.

CATEGORIES, RESONANCE & STAGED HONOURS (v19)
  Two new sessions (also in the picker):
    Categories 類穴  - the command-point system drilled both ways: a point's
                       category, and picking the category's member from a set.
                       210 items.
    Region Resonance 應區 - which body region a point commands, and which point
                       answers a region. Bidirectional, built from the Envoy
                       data. 84 items.
    Both feed Revise once studied, but are only introduced in their own modes
    (so a Mixed session won't flood you with them).
  Honours rebuilt: 55 now, in five stages (Novice / Apprentice / Journeyman /
    Physician / Master). Each stage holds several sections - Practice,
    Consistency, Ground, Craft, Channels, Categories - so there is always a
    near milestone even though the whole arc is long. One honour per channel
    (15) and one per command category (10). Collapsed on the home screen;
    tap "Honours" to open.
  Fixed: session titles rendered in the browser's default black on the dark
    cards (the button had no colour set). Same latent issue fixed on .btn.

UNIFIED SESSIONS + IN-SESSION EDITING (v20)
  Home screen is now three choices instead of ten:
    Balanced Practice 均習 - a little of everything, weighted to names/locations
    Clinical Focus    臨習 - weighted to functions, categories, resonance,
                             differentiation and multi-step cases
    Review Only       復習 - just what is due, nothing new
  Both weighted sessions draw from ONE pool covering every drill type (point
  cards, location, channel map, categories, resonance, function, command
  matrix, clinical reasoning, envoys, dui yao, safety, differentiate,
  characters, and multi-step clinical cases). Weightings decide the mix.
  Session length: a 5-30 minute slider. A multi-step case counts as ~6 cards.
  Sessions fill with due cards first, then new (scaled to length), then early
  review so the chosen length is honoured.
  "Learn new points" and "Full clinic case" remain as links below; every
  individual drill is still in the collapsed mode library.

  Categories 類穴 now runs all three ways, including the one that matters most
  in clinic: "which point is the Yuan-Source of the Kidney channel?" (111 items).

  Edit a point mid-session: the pencil in the session header opens the editor
  for whatever point the card is about; saving redraws the card at once.

  Channel Map no longer prints the code-number beside each option - the track
  showed the position AND the options showed the number, so it could be solved
  by arithmetic. Options now show pinyin (and English); the answer still teaches
  the code.

FIX (v21) — multi-select cases inside a session
  "Build a Rx" cases (select the Shu-Stream point on each of 3 channels, or the
  two points of a Dui Yao pair) were being resolved by a single tap when they
  appeared inside Balanced/Clinical sessions: the first tap disabled every
  option and revealed the rest. The session runner only had the single-answer
  path; the multi-select path existed solely in the standalone Cases mode.
  Now: tap to select up to N, a counter shows "Select 3, then check - 1/3",
  Check stays disabled until N are chosen, and on check the answer marks
  correct / wrong / missed. Applies to every multi-select card regardless of
  category (Shu Stream, He Sea, Yuan Source, Dui Yao pairs, and the rest).

DATA FIX (v22) — command roles on the wrong point (tone-collision)
  Two command roles had been attached to the wrong point because the original
  import matched by tone-stripped pinyin without checking the channel:
    Shu Stream : was on KI-15 Zhongzhu 中注  -> corrected to SJ-3 Zhongzhu 中渚
    Xi Cleft   : was on GB-32 Zhongdu 中瀆   -> corrected to LR-6 Zhongdu 中都
  KI-15 and GB-32 carry no command role and now show none.
  A full audit re-derived all 111 command-point assignments by matching BOTH
  channel and pinyin (with aliases for "Gall Bladder", and treating Confluent /
  Lower He Sea / vessel Xi-Cleft rows as naming the vessel treated rather than
  the point's own channel). Every other assignment verified correct; these four
  points were the only errors. Envoy, Dui Yao and contraindication data are
  keyed by point code, so they were never affected.

FIX (v23) — Clinical Reasoning showed the wrong worked example
  The "for example" line under the answer was matched to the answer by FIRST
  WORD only, so "Jing River" also matched "Jing Well" (and vice versa) and half
  the time illustrated the wrong category entirely. Now matched on the exact
  canonical category via an explicit map, so the example always demonstrates the
  category that was actually the answer.
  Also: the "on Yin" variants (Shu Stream on Yin, Xi on Yin) now draw their
  example from a Yin channel only, and add the teaching note - that on Yin
  channels the Shu-Stream is also the Yuan-Source, and that Yin-channel
  Xi-Clefts are used for blood disorders and bleeding.
  Bei Shu and Mu correctly show no example (they are not in the naming grid).
  Verified over 1200 generated examples: the example category now always equals
  the answer category.

FIX (v24) — stale day counter and phantom streak
  The day only rolled over inside touchDay(), which runs when you GRADE a card.
  So opening the app after a break showed the last study day's figures: a daily
  count that could read "41 of 30", and a streak that had actually already
  lapsed. Nothing was corrupted - the numbers corrected themselves the moment
  you graded anything - but the home screen was lying until then.
  Now a rollDay() runs whenever the app opens or the home screen renders:
    - the daily counter resets when the date changes
    - a streak that has genuinely lapsed settles to 0 immediately
    - a banked freeze is still only SPENT by actually studying, never by
      merely opening the app
  The streak line now states where you stand:
    studied today      -> "N-day streak - X freezes"
    studied yesterday  -> "N-day streak - study today to keep it"
    missed, freeze held-> "N-day streak - a freeze will cover yesterday"
    lapsed             -> "no streak yet - study today to start one"

ARCHIVE A CARD (v25)
  During any session, the ⊘ button in the header archives the card you are
  looking at. It is removed from the session immediately and never appears
  again - in any mode, count, or generated session - until restored.
  Settings -> Archived cards lists them with readable labels
  ("Location · Hegu LI-4") and restores them one at a time or all at once.
  The card's review history is deliberately KEPT while archived, so restoring
  resumes its schedule rather than starting it from scratch.
  Archives ride along in Backup export/import.

COLLEAGUES 同道 (v26) — usernames, connections, shared progress, rivals
  SETUP: run social-schema.sql in Supabase (SQL Editor) once, alongside the
  existing progress table. Requires sync to be configured and signed in.
  - Username: claimed on first visit to Colleagues. 3-20 chars, lowercase
    letters/numbers/underscore. Others add you by USERNAME, never by email.
  - Connections are mutual: a request is pending until the other person
    accepts. Nothing is shared before that, and removing a connection stops
    sharing both ways at once.
  - Shared summary only: streak, level, mature points, honours, reviews this
    week. NEVER your notes, edits, archived cards, which cards you find hard,
    or your email. Enforced by row-level security on the server, not just in
    the app.
  - Star (☆/★) a colleague to make them a "rival": they appear in a strip at
    the top of your home screen with your own row for comparison, refreshed
    when you open the app and cached so it still shows offline. Starring is
    entirely local - nobody is told you starred them.
  - No free-text messaging, by design.

SESSIONS REWORKED + STUDY MATERIAL TOGGLES (v27)
  DAILY GOAL 日課 (new, and now the primary session): takes EVERY due card
    first, then tops up with new cards until your daily goal is reached.
    If more is due than the goal, you get all of it - due work is never
    truncated. Cards already done today count toward the goal.
  TIMED SPRINT 限時 (new, replaces the minutes slider): choose 5/10/15/20/30
    minutes on the home screen; the session runs until the clock expires and
    then reports how far you got. A small muted countdown sits in the session
    header and turns cinnabar in the final minute.
  REMOVED: the session-length slider. It estimated 5 cards per minute, which
    was simply wrong, so the numbers it promised were meaningless.
  STUDY MATERIAL 學材 (Settings): a collapsible section of toggles -
    13 card types, 15 channels, 5 clinical-priority tiers, each with
    all-on/all-off. Channel and tier scope apply everywhere (they define what
    material is in play); card-type toggles apply to the automatic sessions,
    so opening a specific drill from the library still works. The section
    header summarises what is switched off at a glance. Filters ride along in
    backups.

FIX (v28) — Daily Goal now genuinely clears the work
  A card graded "Again" or "Hard" goes back into learning and falls due again
  within a minute or ten. The session queue was built once at the start, so
  those cards were never re-shown - you finished the session with cards still
  due. (A sweep at the end cannot fix this: a card failed seconds ago is due
  in 60 seconds, not now.)
  Now a card graded Again/Hard is re-queued a few cards later and shown again
  before the session ends, capped at 5 showings so a stubborn card cannot loop
  forever. Daily Goal and Review Only additionally sweep once more at the end
  for anything that fell due while you studied (max 4 sweeps). Timed Sprint is
  never extended by a sweep - the clock ends it.
  Also fixed: the Daily Goal budget counted a multi-step clinical case as 6
  cards while the daily counter counted it as 1, so sessions containing cases
  under-delivered against the goal. The goal is now a straight count of cards.

FIX (v28) — multiple-choice option order
  Options were shuffled once when the card was built, so a card seen twice had
  the same layout and the answer could be remembered by position. Options are
  now reshuffled every single time a card is shown.

SIMPLIFIED (v29)
  REMOVED Clinic 臨床 (the full mock case) and its embedded 97-pattern dataset.
    That is 80KB lighter. The Gemini tutor function on Netlify is now unused but
    harmless. Pattern study lives in the separate Pattern Dojo app.
    NOTE: Clinical Reasoning 辨證 and Clinical Cases 醫案 are NOT affected -
    those are point-based drills and remain.
  REMOVED the Clinical Focus session. Balanced Practice covers mixed work.
  PROMOTED Learn New Points to a full session card on the home screen - it was
    buried in a small text link.
  BALANCED PRACTICE size is now yours: chips for 10/20/30/40 cards under the
    card, default 20. It previously built a fixed ~50-60 card session.
  Home screen is now five cards: Daily Goal, Learn New Points, Balanced
  Practice, Review Only, Timed Sprint - with size/time chips where relevant.

POINTS INCLUDED 選穴 (v30)
  Settings, directly under Learn order: a per-point picker. Every channel is
  listed with its point count (e.g. "Lung 11/11"); tap a channel to expand the
  full list and tick or untick individual points. Each row shows the code,
  pinyin, English name and clinical tier.
  - Per channel: All / None buttons.
  - Overall: "Include all" and "Essential only" (keeps just the 54 tier-1
    points - useful for exam cramming, and fully reversible).
  - An unticked point vanishes from every session, every mode and every due
    count, but its review history is KEPT, so ticking it back resumes the
    schedule rather than restarting it.
  - Composes with the existing channel and tier filters, and with archiving.
  - Exclusions ride along in backups, and the Study material summary reports
    them ("12 points excluded").
  Fixed alongside: the header "due" count and per-mode due counts read the
  schedule directly and ignored scope filters, so excluded/filtered points
  still inflated the numbers. They now respect scope.

STRUGGLING CARDS 頑固 (v31) — the leech drill
  A card becomes a "leech" after 4 lapses (4 times you graduated it to review
  and then hit Again). Previously the flag did almost nothing.
  NEW SESSION: "Struggling Cards" appears on the home screen ONLY when you have
  some, showing how many. It shows each card ANSWER-FIRST with its lapse count,
  then tests it - re-testing a card the same way it keeps failing is what has
  not been working. The ⊘ archive button is right there if a card is simply bad.
  Leech cards now carry a 頑 marker in the session header wherever they appear.
  REHABILITATION (new): hold a leech for a 3-week interval and the flag lifts;
    its lapse count drops to just under threshold, so one further slip re-flags
    it. Previously "once a leech, always a leech" - the flag could never clear.
  FIXED: due cards were sorted leech-first and then RESHUFFLED, which undid the
    sort completely (leeches landed at positions 37, 14, 26 of 40 in testing).
    Review Only now genuinely leads with them.
  Leeches respect archiving and the point/channel/tier filters, and multi-step
  cases are excluded from the drill (they cannot render answer-first).

SESSION REFRESH + COLLEAGUES IN THE HEADER (v35)
  FIXED: Supabase access tokens expire after about an hour. The licence and
    colleagues calls did not renew them, so after an hour everything failed
    with "JWT expired" and only signing out and back in fixed it. Any expired
    call now renews the session once and retries. If the refresh token itself
    has died, the app signs out cleanly with a plain message instead of
    showing database jargon.
  Colleagues 同 now has its own button in the top bar, next to 設. It was
    buried in the collapsed mode library.

FIX (v36) — sync could revive a dead streak
  The cloud copy still held an old streak. Merging took the HIGHER of the two
  values, so a streak the device had correctly let go was resurrected the
  moment anything synced — the home screen said 0, then opening Colleagues
  said 3. Spent streak-freezes came back the same way.
  A streak is not a cumulative total; it can and must fall to zero. Now:
    - streak and freezes follow whichever device studied most recently
    - if both last studied on the same day, the higher streak wins but the
      LOWER freeze count does (a freeze is spent, never invented)
    - a merged streak whose last study day is too old is zeroed outright,
      whatever either side stored
    - the day is settled immediately after a sync, not only when the home
      screen happens to be drawn
  XP and lifetime reviews are genuinely cumulative and still take the max.

FULL AUDIT (v37) — four real bugs found and fixed
  1. HIGH — intervals could never grow again. Ease drops 0.2 per lapse and
     lands on 1.4999999999999998 rather than 1.5 (floating point). With a
     1-day interval, round(1 x 1.4999) is 1, so any heavily-lapsed card was
     stuck returning EVERY DAY for ever and could never rehabilitate out of
     leech status. Intervals now always advance by at least one day on a
     successful review.
  2. HIGH — safety cards never resolved to a point. Contraindications name the
     point in pinyin ("Jiquan"), but the resolver expected a code, so all 63
     returned null: the edit pencil never appeared on them, and channel/tier/
     point filters did not apply. Now falls back to a pinyin match (62 of 63;
     the last is the general "Pregnancy" caution, correctly unlinked).
  3. MED — a corrupt saved state or hand-edited backup could break the app.
     Every route that sets the state now passes through sanitiseState(), which
     drops malformed card records and repairs missing objects and numbers.
  4. MED — esc() did not escape quotes, so a point edited to contain a double
     quote broke the editor markup. It is now attribute-safe.
  Verified clean: 409 points with correct canonical channel counts, all 111
  command-point assignments re-derived from the grid, 8 tone-collision pairs
  all correct, 5,304 generated cards with no malformed or ambiguous items,
  RLS on all five tables, no secrets in client files, PWA manifest and service
  worker sound, and every one of the 25 entry points opening cleanly.

FULL AUDIT (v38) — findings and fixes
  Audited: file structure, 409-point data integrity, all 13 exercise builders
  (5,051 generated items), 253 clinical cases, the SRS engine under 300 random
  gradings, day/streak handling, all five session types, filters/archive/point
  exclusions, backup round-trip, security, and the PWA/service worker.

  CLEAN: channel counts all match canonical; zero wrong command roles; no
  duplicate point ids or card keys; no malformed items in any builder; no
  invalid SRS states; no secrets in the shipped file; no unescaped user text;
  no eval; all referenced files present.

  FIXED — clinical safety: contraindication rows grouped by CONDITION rather
  than by point (the "Pregnancy" row listing Hégǔ, Sānyīnjiāo, Kūnlún and
  others) never reached those points. SP-6 and BL-60 showed NO pregnancy
  warning on their own cards. Those warnings now attach to the points named,
  without duplicating one that already exists. 61 -> 63 points carry a caution.

  FIXED — answer leakage: the point-to-category card showed the English name,
  and some English names contain the role ("Xi-Cleft Gate" for PC-4, "Lower
  Great Void" for ST-39). That card now shows characters, pinyin and code only.

  FIXED — service worker: a failed GET of any kind fell back to serving
  index.html, so an offline Supabase call returned HTML to code expecting JSON.
  The fallback now applies only to page navigations.

  KNOWN AND ACCEPTED: five unused functions remain in the source (harmless);
  13 envoy rows and 3 dui yao rows reference vertebrae rather than points (they
  are correct data and render as ordinary flashcards); ST-17 has no functions
  (correct — it is a landmark point); 48 Extra points are untiered and default
  to Peripheral.

HEADER ICONS (v39)
  Settings and Colleagues were CJK glyphs (設 and 同), which read as decoration
  rather than as buttons. Both are now inline SVG icons — a gear and a pair of
  figures — drawn in currentColor so they inherit the existing button styling,
  including the gold "on" state. Also given aria-labels for screen readers.
  The seal, brand and sound button are unchanged; ♪ is already unambiguous.

SECOND FULL AUDIT (v40) — performance, longevity, edge cases, clinical content
  New ground covered: a 90-day simulated study run (2,713 gradings), storage
  projection, per-function profiling, 18 extreme UI states, re-entrancy,
  and clinical spot-checks against the classical point categories.

  FIXED — home screen was 7x slower than it needed to be. renderHome computed
    due counts for all 17 modes (368ms of its 375ms) even though the mode
    library is collapsed and those numbers are invisible. Counts are now only
    computed when the library is open. renderHome: 375ms -> 49ms.
  FIXED — starting a session rebuilt the entire 3,825-item pool every time
    (~490ms, worse on a phone). The pool is now cached and invalidated whenever
    filters, archiving, point exclusions or edits change it — 11 invalidation
    points, each verified. Session start: 490ms -> 101ms.
  FIXED — the archived-cards list in Settings crashed if the archived object
    was missing. Guarded, though sanitiseState already prevented this in
    normal use.

  VERIFIED CLEAN: all 12 Yuan-Source, 12 Xi-Cleft, 12 Luo, 12 He-Sea and 8
    Confluent points are correct; all 18 canonical high-yield points are tier 1;
    no SRS corruption after 90 days (longest interval 125 days); full study
    history projects to ~0.56 MB, well inside the 5 MB browser quota; every
    screen survives 18 extreme states including all-filtered and all-archived;
    rapid navigation is safe; code resolution is case-insensitive across every
    channel abbreviation; the rank ladder covers levels 1-100.

  FLAGGED FOR MATT — a clinical judgement, deliberately NOT changed:
    "Points that send Qi to the Blood" answers SP-10 Xuèhǎi. The classical
    Influential (Hui) point for Blood is BL-17 Géshū. The neighbouring rows
    (Vessels LU-9, Sinews GB-34, Marrow GB-39, Bone BL-11) are all the standard
    Hui points, so this row sits in a Hui-shaped list. The Hui set is also
    incomplete here — Zang (LR-13), Fu (REN-12) and Qi (REN-17) are absent.
    Decide whether to change Blood to BL-17 and add the missing three.

EIGHT INFLUENTIAL POINTS COMPLETED (v41)
  Added the three that were missing: Zang LR-13 Zhangmen, Fu REN-12 Zhongwan,
  Qi REN-17 Shanzhong. The set is now complete.
  Blood now accepts BOTH BL-17 Geshu (the classical Hui point) and SP-10
  Xuehai — either answer is marked correct and both are shown on the back.
  Underneath, the resonance mode learned to handle rows naming several points.
  This also fixed a latent bug: rows like "Qi to the Throat" (Lu7, Lu6, Ki6,
  LI4) only counted the FIRST point as correct, so the other three could appear
  as WRONG answers even though the data lists them as valid. Now every listed
  point is accepted, at most two are offered per card so it stays a real test,
  and a valid point is never used as a distractor.
  The three new points are also picked up by the importance score.

THIRD AUDIT (v42) — closing the gaps I could reach
  Covered ground the earlier audits could not: the clinical prose of all 409
  points, the character dictionary, accessibility, the licence function
  actually executed, and realistic two-device sync.

  FIXED — sync could be silently dropped. A sync requested while another was
    running was discarded rather than queued, so the cloud could be left
    holding a state older than the device. Overlapping requests are now
    remembered and run once the current sync finishes.
  FIXED — the licence function returned raw Supabase error text to the
    browser, disclosing table and policy names to anyone probing it. Failures
    are now logged to the Netlify function log instead.
  FIXED — accessibility: the ☆ pin control used a colour at 2.16:1 contrast,
    below the 3:1 minimum for interactive elements; raised to 3.61:1. Header
    icon buttons keep their 34px look but now have a 44px touch area.

  VERIFIED — licence function executed end to end against mocked Gumroad and
    Supabase: valid keys activate, unknown keys and forged sessions are
    refused, refunds/chargebacks/cancelled subscriptions are rejected, the
    3-seat limit holds while the same person may always re-activate, and
    missing environment variables fail loudly.
  VERIFIED — two devices merge without losing a card from either side, the
    more-studied record wins a conflict, clock skew cannot inflate a streak or
    destroy progress, offline work is pushed on reconnect, and a corrupt cloud
    row cannot poison the device.
  VERIFIED — prose: one misspelling ("Tonfiy", HT-5), cun notation 100%
    consistent, no encoding damage, every pinyin toned, every hanzi valid.
    Character dictionary 359/367 complete (the 8 gaps are rare variant forms
    absent from the source dictionary; the app skips them cleanly).

  FLAGGED FOR MATT — a data error, not changed without your say-so:
    EX-2 Dangyang (当阳) carries EX-13 Bailao's location, "2 cun superior to
    Dazhui DU-14, 1 cun lateral to the midline". Dangyang is a FOREHEAD point —
    its own functions (migraine, dizziness, vertigo) and its neighbours in the
    list confirm that. The standard location is on the forehead, directly above
    the pupil, about 1 cun above the anterior hairline. EX-13's entry is
    correct as it stands.

FREE EDITION (v43) — 20 points without a licence
  Without an activated licence the app opens twenty points instead of 409:
    PC6 LU7 LI4 SP4 SJ5 GB41 KI6 ST36 REN12 SI3
    LU9 REN17 BL40 GB34 LR3 BL62 REN4 SP6 HT7 DU4
  Chosen for breadth as well as value: one from every one of the 14 channels,
  all tier-1, and between them the four Command points and all eight Confluent
  points — so twelve card types still work and the free edition demonstrates
  the whole app rather than a crippled corner of it. 394 cards free of 3,853.
  A card is withheld unless EVERY point it needs is unlocked, so a Dui Yao pair
  reaching outside the twenty is held back rather than half-shown. Character
  cards follow the points that use them.
  Locked points still appear in the Atlas, dimmed and marked "locked", so the
  scale of what a licence buys is visible.
  Progress on locked points is withheld, never deleted — activate a licence and
  everything resumes on its existing schedule.
  A verified licence is cached on the device, so a paying user offline is not
  locked out; an online check that comes back empty clears it, so revoking a
  licence still takes effect.

  HONEST LIMIT: the 409 points ship inside index.html, so this gate is a
  clear free/paid boundary, not an unbreakable one — anyone technical can read
  the file. Cloud sync remains the genuinely enforced part, since the database
  refuses to store anything without a licence row.

CONTENT GATE MADE REAL (v44)
  The v43 free edition was trivially bypassable, two ways:
    1. every point shipped inside index.html — view source, Ctrl+F, read all 409
    2. `ST.lic={key:"x"}` in the browser console flipped licensed() to true
  Both are now closed by removing the content rather than guarding it.
  - Locations, functions and English names for the 389 non-free points have
    been STRIPPED from index.html (40 KB smaller) and moved to a new
    serverless function, netlify/functions/points.js, which returns them only
    to a signed-in user holding a licence row. That row can only be written by
    activate.js, which alone holds the service-role key.
  - Faking licensed() in the console now achieves nothing: verified in testing
    that the card pool does not grow, because there is no content to unlock.
  - After a legitimate unlock the data is cached locally, so the app keeps
    working offline. Revoking a licence clears the cache and the app returns to
    twenty points.
  - Structure (ids, codes, channels, pinyin, characters) still ships, so
    channel maps and category drills work in the free edition.
  DEPLOY: netlify/functions/points.js must be uploaded alongside activate.js
  and uses the same two environment variables.

  STILL NOT ABSOLUTE, honestly: a paying user can extract the payload from
  their own browser once fetched. No offline-capable app can prevent that. What
  has changed is that a non-paying visitor now gets nothing without buying —
  which is the boundary that actually matters commercially.

AUDIT OF THE v44 SPLIT — no changes needed
  The content-gate rework was audited in depth and came back clean.

  DATA INTEGRITY: all 409 points accounted for — 20 free, 389 in the vault,
  none missing, none duplicated, no free point damaged, no locked content left
  in index.html. Pinyin, codes, channels, characters, command roles, cautions,
  envoy/dui-yao/naming-grid rows all intact. Spot-checked KI1, ST44, BL23,
  GB20, DU14, EX2.

  LIFECYCLE: a corrupt, null or empty cache is handled without crashing; a
  partial payload merges what it has and leaves the rest locked; a storage
  quota failure still lets the session work, it just will not persist.

  INTERACTION: point edits survive lock -> unlock -> lock with the true data
  underneath (restore-default returns the real location, not a blank);
  archiving, channel filters and point exclusions all still work with the
  vault loaded; a backup contains no locked content but restores progress
  correctly.

  BYPASS ATTEMPTS (seven tried, all failed): setting ST.lic, setting LICENCE,
  calling applyVault directly with null or {}, forging a cached vault (yields
  only text the attacker already had), asking the server without a licence,
  grepping the shipped file, and looking for secrets. None revealed a single
  locked location. Importantly, importing a licensed user'"'"'s BACKUP FILE copies
  the licence flag but still unlocks nothing, because the server refuses.

  PERFORMANCE: merge 4ms, first pool build 194ms, cached 0ms, home render 27ms.
  Storage: 63 KB vault alongside progress.

PRIVACY IN THE APP (v45)
  Settings now carries a "Privacy & your data" section, written from what the
  code actually does rather than from a template: what is kept on the device,
  what is held once you sign in, exactly what a connected colleague can see,
  every third party involved, what is NOT done (no analytics, advertising,
  tracking cookies or third-party scripts), how to have everything deleted,
  and the reminder that this is a study aid rather than a clinical reference.
  It works offline and needs no configuration.
  config.js gained PRIVACY_URL, TERMS_URL and CONTACT_EMAIL. Fill them in once
  you have published PRIVACY-AND-TERMS.md and the app links to them; leave them
  empty and the links are simply hidden. As with the Supabase keys, app updates
  never touch config.js.

  FOUND WHILE WRITING IT: the app loads its typefaces from Google Fonts and the
  stroke-order library from jsDelivr, so every visitor's IP is disclosed to
  those services. That is ordinary practice but it IS a GDPR consideration in
  the UK and EU — a German court ruled against unconsented Google Fonts
  embedding in 2022. Both the in-app summary and the drafted policy now say so
  plainly. Self-hosting both would remove the issue entirely; say the word.

FIX (v47) — the point picker looked like everything was unlocked
  Settings -> Points included showed all 409 points ticked even in the free
  edition, because the tick means "included by YOUR filter", not "unlocked by
  your licence" — two different things that looked identical. The gate itself
  was working (sessions were correctly limited to 20) but the screen said
  otherwise, which is arguably worse than a real leak: it made a working gate
  look broken.
  Now a locked point shows a padlock instead of a tick, its row is dimmed, it
  cannot be toggled, and tapping it explains why. Channel headers read
  "1 of 27" (unlocked of total) rather than filter counts, and a line at the
  top of the panel explains the padlock. Once licensed it all reverts to the
  normal filter behaviour.

FIX (v48) — the channel-map quiz gave itself away
  Options showed the English name beside the pinyin, and those names are
  usually literal descriptions of where the point sits — "Elbow Bone-Hole",
  "Upper Arm", "Pool at the Crook". Knowing roughly where position 12 of 20
  falls on the arm was enough to pick the answer without knowing the point.
  This was my own doing: I had swapped the code-number out of the options to
  stop people solving it by arithmetic off the track, and replaced it with the
  English name, which turned out to leak the same information a different way.
  Options now show pinyin only. Knowing which name belongs at which position
  IS the skill being tested. The answer side still teaches the code, English
  name, location and neighbours.

  TIDIED at the same time: nine points had pinyin that broke the app's own
  convention — lowercase starts and stray spaces ("yáng xī", "shàng jù xū",
  "Zhōng chōng"). Now consistent with the rest. One was a real error: SP-9 read
  "yīnlíngqúan" with the tone mark on the wrong vowel; corrected to
  "Yīnlíngquán". EX-12 "Jīnjīn, Yùyè" left as it is — genuinely two points.
  Verified afterwards that all 111 command-grid rows and the contraindications
  still resolve.

  NOTED, not changed: BL-14, BL-22 and BL-45 have their pinyin in the English
  field instead of a translation ("Juéyīnshū", "Sanjiao Shu", "Yìxǐ"), and the
  nine Heart-channel points have no English name at all because the source
  spreadsheet had no English column for that sheet. Harmless — the app simply
  omits the line — but worth knowing if you ever fill them in.

ENGLISH NAMES COMPLETED (v49)
  All 409 points now carry a unique English name. Previously twelve did not.
    The nine Heart points had none at all (the source sheet had no English
    column): HT1 Highest Spring, HT2 Blue-Green Spirit, HT3 Lesser Sea,
    HT4 Spirit Way, HT5 Connecting Li, HT6 Yin Cleft, HT7 Spirit Gate,
    HT8 Lesser Mansion, HT9 Lesser Surge.
    BL14 had its pinyin in the field; now "Pericardium Shu", matching the
    house convention where every other Back-Shu names its organ.
    BL22 is now "San Jiao Shu", spelled as the channel is elsewhere.
    BL45 譩譆 had its pinyin; now "Sigh of Pain" — the characters imitate the
    sound a patient makes when the point is pressed.
  HT4 靈道 was going to be "Spirit Pathway", which already belongs to DU11
    神道. Different characters, so HT4 became "Spirit Way" to keep every name
    distinct — two identical English names would be confusing in a study app.
  These are standard renderings, but translations vary between textbooks and
  you are the clinical authority: any of them can be changed in seconds via
  the point editor, and your version then appears everywhere.

FIX (v50) — two pedagogy problems
  1. A POINT'S CARDS ARRIVED TOGETHER. Every card for one point scores the same
     priority, so sorting a due queue by priority filed all four side by side —
     and answering the second, third and fourth straight after the first is
     short-term memory, not recall. Queues are now round-robined across points:
     measured on a 160-card review, the longest run of one point is 1 and its
     cards sit an average of 40 apart. Leeches still come first.
  2. CHANNEL-SEQUENCE CARDS WERE MOSTLY ROTE. "Which point comes next" was
     generated for every consecutive pair on every channel, so most asked you
     to recite the order of peripheral points from a bare name — nothing to
     anchor to, and they crowded out useful reviews. Now generated only where
     the ANSWER is a point you would actually reach for (tier 1-3): 361 cards
     down to 173, spread 52/59/62 across Essential/Core/Standard. The prompt
     also shows the starting point's location, so there is a physical anchor
     rather than a name floating free.
