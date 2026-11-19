import subprocess, numpy as np, sys
# Count distinct "arrival" events: bursts where a NEW region changes and then stays (piece lands and holds).
v = sys.argv[1]; W, H = 192, 108; fps = 30
raw = subprocess.run(["ffmpeg","-v","error","-i",v,"-t","8.5","-vf",f"scale={W}:{H},format=gray","-f","rawvideo","-"],capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.int16)
# global motion (camera) estimate: phase correlation between consecutive frames
def shift(a, b):
    A = np.fft.fft2(a); B = np.fft.fft2(b); R = A * B.conj(); R /= np.abs(R) + 1e-9
    r = np.abs(np.fft.ifft2(R)); y, x = np.unravel_index(r.argmax(), r.shape)
    if y > H/2: y -= H
    if x > W/2: x -= W
    return x * 10, y * 10
xs, ys = [], []
for i in range(1, len(fr)):
    dx, dy = shift(fr[i].astype(float), fr[i-1].astype(float)); xs.append(dx); ys.append(dy)
xs, ys = np.array(xs), np.array(ys)
print(f"frames={len(fr)}  camera pan total dx={xs.sum():.0f}px dy={ys.sum():.0f}px (1080p units)")
for s in range(0, 8):
    seg = slice(s*fps, (s+1)*fps)
    print(f"  {s}-{s+1}s  pan dx={xs[seg].sum():6.0f}  dy={ys[seg].sum():6.0f}")
# scale change: compare edge energy spread (rough zoom indicator) between 1s windows
