# RETRO — brain-procrastination-ep01

**File:** `out/brain-procrastination-ep01.mp4` · 6:16 (376.3 s) · 1920×1080 · -14.0 LUFS / -1.4 dBTP · QA PASS · subtitles `out/brain-procrastination-ep01.srt`

## Went well
- Plan voiceover used word for word, split into 51 beats (one picture per line); every beat builds in 2–3 stages, so the picture changes every ~2–4 s.
- Consistent mascot: 14 expressions in one Gemini chat (anchor prompt from plan 4.1), keyed cleanly from #00FF00 onto navy.
- A vector icon set drawn in code (brain/head/CEO/Amygdala/phone/scale/loop/flask…) is sharp, exactly on palette, and animatable (alarm shake, loop lighting up, flask filling).

## Problems
- Gemini quota ran out after 14 images → no hero/thumbnail images yet (LESSON-37).
- No ElevenLabs → used Kokoro `am_michael`: clear but less emotional than ElevenLabs (LESSON-36).
- One transient render failure (LESSON-38).
- The film is 6:16 vs the planned 7:00 (the plan's voiceover text itself is that long).

## Harvest
- LESSON-36 (Kokoro English TTS), LESSON-37 (Gemini quota → mascot first, icons in code), LESSON-38 (render log + exact --expect).
- Pattern "brain explainer / psychology infographic (navy)".
- Reusable kit for the channel: `remotion/src/brain/` → EP02+ only need new `shots.tsx` + `script.json`.

## Waiting on owner
- Approve the voice (Kokoro am_michael) or provide an ElevenLabs key.
- 60 fps? (currently 30). Thumbnails + Shorts 01–03 after the long video is approved.
