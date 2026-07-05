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
