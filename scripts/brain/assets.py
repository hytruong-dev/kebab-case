"""Brain channel — Gemini raw images -> clean, keyed, published assets + review sheet.

  python scripts/brain/assets.py <slug> <ep>         e.g.  python scripts/brain/assets.py brain-procrastination-ep01 ep01

projects/<slug>/assets/raw/<id>.png  (from tools/gemini-alt/run-thread.mjs)
  1. remove the Gemini watermark (tools/image/gemini_watermark.py, in place, once)
  2. chroma-key #00FF00 for M*/C*/O* (tools/image/chroma_key.py) -> assets/keyed/   (temp, re-creatable)
  3. publish to remotion/public/brain/<ep>/:
       M* mascots  1024x1024 png (layouts assume the full square)
       C*/O* props cropped to the subject + 4% margin, longest side 900 (iconsImg <Im> boxes size them)
       H*/T* heroes/thumbnails 1920x1080 jpg (navy background, not keyed); T* also copied to out/thumbnails/
  4. assets/sheet_all.jpg — every keyed asset on navy, red frame = subject touches the edge (re-generate it)
"""
import glob, os, shutil, subprocess, sys
import cv2
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
slug, ep = sys.argv[1], sys.argv[2]
A = os.path.join(ROOT, "projects", slug, "assets")
RAW, KEY = os.path.join(A, "raw"), os.path.join(A, "keyed")
DST = os.path.join(ROOT, "remotion", "public", "brain", ep)
os.makedirs(KEY, exist_ok=True); os.makedirs(DST, exist_ok=True)
done = os.path.join(A, ".watermark_done")
seen = set(open(done).read().split()) if os.path.exists(done) else set()

raws = sorted(glob.glob(os.path.join(RAW, "*.png")))
fresh = [f for f in raws if os.path.basename(f) not in seen]
if fresh:
    subprocess.run([sys.executable, os.path.join(ROOT, "tools/image/gemini_watermark.py"), "image", *fresh, "--inplace", "--force"], check=True)
    open(done, "a").write("\n".join(os.path.basename(f) for f in fresh) + "\n")
tokey = [f for f in raws if os.path.basename(f)[0] in "MCO" and not os.path.exists(os.path.join(KEY, os.path.basename(f)[:-4] + "_key.png"))]
if tokey:
    subprocess.run([sys.executable, os.path.join(ROOT, "tools/image/chroma_key.py"), *tokey, "--out-dir", KEY], check=True, stdout=subprocess.DEVNULL)

tiles = []
for f in sorted(glob.glob(os.path.join(KEY, "*_key.png"))):
    n = os.path.basename(f).replace("_key", "")
    im = cv2.imread(f, cv2.IMREAD_UNCHANGED)
    if n[0] == "M":
        cv2.imwrite(os.path.join(DST, n), cv2.resize(im, (1024, 1024), interpolation=cv2.INTER_AREA))
    else:
        ys, xs = np.nonzero(im[..., 3] > 40)
        m = int(0.04 * max(im.shape[:2]))
        c = im[max(0, ys.min() - m):ys.max() + m, max(0, xs.min() - m):xs.max() + m]
        s = 900 / max(c.shape[:2])
        cv2.imwrite(os.path.join(DST, n), cv2.resize(c, (int(c.shape[1] * s), int(c.shape[0] * s)), interpolation=cv2.INTER_AREA))
    a = im[..., 3:4] / 255.0
    t = cv2.resize((im[..., :3] * a + np.array([42, 23, 15]) * (1 - a)).astype(np.uint8), (320, 320))
    if max(im[:8, :, 3].max(), im[-8:, :, 3].max(), im[:, :8, 3].max(), im[:, -8:, 3].max()) > 20:
        cv2.rectangle(t, (0, 0), (319, 319), (0, 0, 255), 6)
    cv2.putText(t, n[:18], (4, 312), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
    tiles.append(t)

thumbs = os.path.join(ROOT, "out", "thumbnails"); os.makedirs(thumbs, exist_ok=True)
for f in sorted(glob.glob(os.path.join(RAW, "[HT]*.png"))):
    im = cv2.imread(f); h, w = im.shape[:2]; tw = int(h * 16 / 9)
    im = im[:, (w - tw) // 2:(w - tw) // 2 + tw] if tw <= w else im[(h - int(w * 9 / 16)) // 2:(h - int(w * 9 / 16)) // 2 + int(w * 9 / 16)]
    out = os.path.join(DST, os.path.basename(f)[:-4] + ".jpg")
    cv2.imwrite(out, cv2.resize(im, (1920, 1080), interpolation=cv2.INTER_AREA), [cv2.IMWRITE_JPEG_QUALITY, 92])
    if os.path.basename(f)[0] == "T":
        shutil.copy(out, thumbs)

if tiles:
    while len(tiles) % 6: tiles.append(np.zeros((320, 320, 3), np.uint8))
    cv2.imwrite(os.path.join(A, "sheet_all.jpg"), np.vstack([np.hstack(tiles[i:i + 6]) for i in range(0, len(tiles), 6)]))
print(f"published {len(os.listdir(DST))} files -> remotion/public/brain/{ep}; review projects/{slug}/assets/sheet_all.jpg")
