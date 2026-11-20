# BRIEF — Brain & Psychology EP01: Why Your Brain Loves Procrastinating (And How to Trick It)

Source of truth: `PLAN_owner.md` (owner's channel plan; section 5 = script, 4 = mascot, 7 = SEO + assembly).

| Field | Value |
| --- | --- |
| Channel / niche | International (US/UK/CA/AU), Animated Explainers & Infographics — Brain & Psychology, Season 1 EP01 |
| Language | English voiceover + English captions (the plan's voiceover, word for word) |
| Length | ~6:16 (plan target 7:00; the voiceover text itself reads in ~6:15 at natural pace) |
| Format | 1920×1080, 30 fps, H.264 (plan says 60 fps; 30 kept for render time — say if 60 is wanted) |
| Look | Flat 2D vector, Kurzgesagt-like; navy `#0F172A`, amber `#F59E0B` (data/positive), coral `#F43F5E` (stress) + teal/sky accents |
| Mascot | Gemini, ONE chat, plan 4.1 anchor prompt, 14 expressions (M01–M14) keyed from #00FF00 |
| Voice | Kokoro-82M `am_michael` (local, free; ElevenLabs not configured) — `scripts/tts_kokoro.py` |
| Audio | narration + whoosh on every cut + pop on first element + chapter chime + clock ticks (hook) + alarm (threat) + ambient synth bed; -14 LUFS / -1.5 dBTP |
| Pace | 51 beats (one per narration line, TASTE-08), each builds in 2–3 stages → picture changes every ~2–4 s (plan 2.1) |

## Storyboard (shot = narration line; full text in `script.json`)
- **Part 1 Hook (0:00–0:58):** deadline calendar + ticking clock → mascot polishing plant + 45 min counter (folders / keyboard / pencil video) → "LAZY?" stamp → LAZINESS / TIME MANAGEMENT struck out → 95% / 20% rings → willpower bar drains, brain glitches → zoom into head + "why it sabotages you / 3 ways".
- **Part 2 Roommates (0:58–2:18):** head with CEO + Amygdala → PFC glows, CEO with blueprint → planning/logic/future icons → zoom to the Amygdala (almond) → career/grades/plan crossed out → avoid pain / seek pleasure → boring/confusing/overwhelming → spreadsheet turns red "THREAT!" → FIGHT or FLIGHT → mascot runs from spreadsheet to phone → THEN tiger / NOW spreadsheet split.
- **Part 3 Future You (2:18–3:21):** TIME INCONSISTENCY = PRESENT BIAS → scale: cookie now beats treasure chest → fMRI scanner → present self lights amber → +2 days / +10 years timeline → Future You ≈ stranger → "someone else's problem" → instant dopamine vs delayed reward bars → Present You tosses papers over the dashed wall to Future You.
- **Part 4 Doom Loop (3:21–4:19):** GUILT weight drops → midnight clock + 5 AM vow → guilt = fuel can on the fire → 5-node loop lights 1→5 → cortisol flask fills → stress meter climbs while loop spins → "you care TOO MUCH".
- **Part 5 3 tricks (4:19–5:36):** willpower empty, speak its language → 3 locks → boulder "3-HOUR TASK" shrinks to "5 MIN" pebble → 00:00→05:00 timer + permission → no alarm + Zeigarnik ring closes → friction scale flips (+20 s) → phone behind door, laptop fills → heart → Carleton bars → loop + fire die out.
- **Part 6 Outro (5:36–6:16):** CRT "ancient software" + orbiting distractions → recap 3 cards → dopamine flask teaser (EP06) → end-screen frame + pointing mascot + thumbs up.

## Deliverables
- `out/brain-procrastination-ep01.mp4` (video) · `projects/brain-procrastination-ep01/SEO.md` (titles A/B/C, description with chapters, tags, pinned comment).
- Thumbnails (plan 4.3) + the 6 hero illustrations: still queued in Gemini (limit reached) — not needed by the film.
- Shorts 01–03 (plan section 6): not made yet — next step after the owner approves the long video.
