"""English narration with Kokoro-82M (local, free; same model as `hyperframes tts`), one clip per sentence.

  python scripts/brain/tts_kokoro.py projects/<slug>
Reads projects/<slug>/script.json (voice.voice, voice.speed), writes audio/raw/<id>_<hash>.wav (cached by text),
then runs scripts/tts-project.mjs --build for tempo/trim/-16 LUFS + timeline.json (same format as the OmniVoice path).
"""
import hashlib, json, subprocess, sys
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parent.parent.parent
P = (ROOT / sys.argv[1]).resolve()
script = json.loads((P / "script.json").read_text(encoding="utf-8"))
v = script["voice"]
cache = Path.home() / ".cache" / "hyperframes" / "tts"
k = Kokoro(str(cache / "models" / "kokoro-v1.0.onnx"), str(cache / "voices" / "voices-v1.0.bin"))
raw = P / "audio" / "raw"
raw.mkdir(parents=True, exist_ok=True)
n = 0
for ch in script["chapters"]:
    for i, s in enumerate(ch["sentences"]):
        sid = f"{ch['id']}_{i + 1:02d}"
        # same hash recipe as tts-project.mjs: `${ref}|${speed}|${say}` with ref = undefined for kokoro
        sp = v["speed"]
        sp_js = str(int(sp)) if float(sp).is_integer() else str(sp)  # JS prints 1.0 as "1"
        h = hashlib.sha1(f"{v.get('ref', 'undefined')}|{sp_js}|{s['say']}".encode("utf-8")).hexdigest()[:10]
        old = list(raw.glob(f"{sid}_*.wav"))
        if not (raw / f"{sid}_{h}.wav").exists() and len(old) == 1:  # rename a clip cached under the old hash
            old[0].rename(raw / f"{sid}_{h}.wav")
        out = raw / f"{sid}_{h}.wav"
        if out.exists():
            continue
        audio, sr = k.create(s["say"], voice=v["voice"], speed=v["speed"], lang="en-us")
        sf.write(str(out), audio, sr)
        n += 1
        print(f"{sid} {len(audio) / sr:.1f}s", flush=True)
print(f"synthesized {n} clips")
subprocess.run(["node", str(ROOT / "scripts" / "tts-project.mjs"), str(P), "--build"], check=True)

