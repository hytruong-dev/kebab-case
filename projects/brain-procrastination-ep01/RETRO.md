# RETRO — brain-procrastination-ep01 (v2, owner doc 2026-11-21, rebuilt from scratch)

**File:** `out/brain-procrastination-ep01.mp4` · **10:22** (622.3 s) · 1920×1080 **60 fps** · -14.0 LUFS / -1.4 dBTP · **QA PASS**
· subtitles `out/brain-procrastination-ep01.srt` (156 cues) · thumbnails `out/thumbnails/` (3).

## What changed vs v1 (owner doc v2)
- Length 6:16 → 10:22 (doc: 10–11 min single episodes for the Season → Mega-Video plan). Section 5 voiceover kept verbatim
  (only "next seven minutes" → "next few minutes", as in doc v2); +21 research beats with real sources (BRIEF.md table).
- Modular ending: Part 6 `[BRIDGE_TRANSITION]` (recap + "Next: cheap dopamine", Ep 02) and a separate `[SINGLE_OUTRO]` block (10:09–10:22,
  no PART card) to cut when merging 6 episodes into the Mega-Video.
- 60 fps (doc 7.2), 77 Gemini images (new: aged mirror, waiter, guitar stand, brain scan, leaking dopamine flask, handshake hero…).

## Went well
- 3 Gemini accounts in parallel, one chat each, mascot reference pasted → 77 consistent images in ~20 min.
- Kit reuse: 51 shots from v1 + 21 new shots; only `ep01/shots.tsx` changed.

## Problems → fixes
- ffmpeg command line too long with 72 beats → asplit + `-/filter_complex` file (LESSON-13).
- QA "frozen" on 8 long research beats after a 20-min render → `brain-motion-check.mjs` gate + Drift/Kick (LESSON-40).
- Playwright download ENOENT on one account → restart same job (LESSON-41).

## Waiting on owner
- Voice: Kokoro `am_michael` (local). ElevenLabs if you add a key.
- Shorts 01–03 (doc section 6) and Episode 02 "How Cheap Dopamine Hijacks Your Brain".
