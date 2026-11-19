import sys, cv2, numpy as np
from pathlib import Path
# White-background cutout: flood-fill from the borders over near-white pixels (so white INSIDE objects, like foam
# or a white shirt enclosed by an outline, survives), then feather the alpha edge 2px. Crops to content + margin.
for f in sys.argv[1:]:
    img = cv2.imread(f, cv2.IMREAD_COLOR)
    h, w = img.shape[:2]
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    near_white = ((hsv[..., 2] > 222) & (hsv[..., 1] < 28)).astype(np.uint8)
    mask = np.zeros((h + 2, w + 2), np.uint8)
    bg = np.zeros((h, w), np.uint8)
    seeds = [(x, 0) for x in range(0, w, 40)] + [(x, h - 1) for x in range(0, w, 40)] + [(0, y) for y in range(0, h, 40)] + [(w - 1, y) for y in range(0, h, 40)]
    work = near_white * 255
    for sx, sy in seeds:
        if work[sy, sx] == 255 and bg[sy, sx] == 0:
            m = np.zeros((h + 2, w + 2), np.uint8)
            cv2.floodFill(work.copy(), m, (sx, sy), 128, flags=4 | (255 << 8) | cv2.FLOODFILL_MASK_ONLY)
            bg |= m[1:-1, 1:-1]
    alpha = (1 - (bg > 0)).astype(np.float32)
    alpha = cv2.morphologyEx(alpha, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    alpha = cv2.GaussianBlur(alpha, (5, 5), 0)
    ys, xs = np.where(alpha > 0.05)
    pad = 24
    y0, y1, x0, x1 = max(0, ys.min() - pad), min(h, ys.max() + pad), max(0, xs.min() - pad), min(w, xs.max() + pad)
    rgba = np.dstack([img, (alpha * 255).astype(np.uint8)])[y0:y1, x0:x1]
    out = str(Path(f).with_name(Path(f).stem.replace("_iso", "") + "_cut.png"))
    cv2.imwrite(out, rgba)
    print(out, rgba.shape[1], "x", rgba.shape[0], f"opaque={float((alpha > 0.5).mean()):.2f}")
