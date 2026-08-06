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
