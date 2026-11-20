"""Key out a flat chroma-key green background (TASTE-24) -> RGBA with soft edges and green despill.

  python tools/image/chroma_key.py a.png b.png [--out-dir DIR]
  -> a_key.png (same size as the input, so registered plates stay aligned)

A pixel is background when its hue is green AND it is saturated and bright (the key green), so muted moss-green
grass (low saturation) survives. Alpha is soft over a small band; green spill on edges is clamped (G <= max(R,B)).
"""
import sys
from pathlib import Path

import cv2
import numpy as np

files = [a for a in sys.argv[1:] if not a.startswith("--")]
out_dir = sys.argv[sys.argv.index("--out-dir") + 1] if "--out-dir" in sys.argv else None
if out_dir:
    files = [f for f in files if f != out_dir]

for f in files:
    img = cv2.imread(f, cv2.IMREAD_COLOR)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV).astype(np.float32)
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    b, g, r = [img[..., i].astype(np.float32) for i in range(3)]
    green_hue = np.clip(1 - np.abs(h - 60) / 22, 0, 1)            # OpenCV hue 60 = pure green
    strength = np.clip((s - 90) / 80, 0, 1) * np.clip((v - 80) / 80, 0, 1)
    dominance = np.clip((g - np.maximum(r, b) - 40) / 60, 0, 1)    # G clearly above R and B
    bg = green_hue * strength * dominance
    alpha = 1 - bg
    # clean: holes inside the object stay opaque, specks in the green are dropped
    hard = (alpha > 0.5).astype(np.uint8)
    hard = cv2.morphologyEx(hard, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    n, lbl, st, _ = cv2.connectedComponentsWithStats(hard, 8)
    if n > 1:
        big = st[1:, cv2.CC_STAT_AREA].max()
        keep = np.isin(lbl, [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] > big * 0.01])
        alpha = np.where(keep, np.maximum(alpha, 0), np.minimum(alpha, 0.0))
        alpha = cv2.GaussianBlur(alpha.astype(np.float32), (3, 3), 0)
    # despill only in a thin band along the cut edge (keeps the moss-green grass inside the object intact)
    edge = cv2.dilate(((alpha > 0.02) & (alpha < 0.98)).astype(np.uint8), np.ones((7, 7), np.uint8)) > 0
    g2 = np.where(edge, np.minimum(g, np.maximum(r, b) + 6), g)
    out = np.dstack([b, g2, r, alpha * 255]).clip(0, 255).astype(np.uint8)
    dst = Path(out_dir or Path(f).parent) / (Path(f).stem + "_key.png")
    cv2.imwrite(str(dst), out)
    print(dst.name, img.shape[1], "x", img.shape[0], f"opaque={float((alpha > 0.5).mean()):.2f}")
