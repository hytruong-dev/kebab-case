import subprocess, numpy as np, sys
v = sys.argv[1]; W, H = 192, 108; fps = 10
raw = subprocess.run(["ffmpeg","-v","error","-i",v,"-vf",f"fps={fps},scale={W}:{H},format=rgb24","-f","rawvideo","-"],capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W, 3).astype(np.int16)
final = fr[-1]
print("frames", len(fr))
for i in range(1, len(fr)):
    d = np.abs(fr[i] - fr[i-1]).sum(2)
    ch = d > 40
    pct = ch.mean() * 100
    done = (np.abs(fr[i] - final).sum(2) < 40).mean() * 100
    if pct > 0.3:
        ys, xs = np.where(ch)
        print(f"t={i/fps:4.1f}s change={pct:5.1f}%  bbox x{xs.min()*10}-{xs.max()*10} y{ys.min()*10}-{ys.max()*10}  matches_final={done:5.1f}%")
    else:
        print(f"t={i/fps:4.1f}s change={pct:5.1f}%  (still)  matches_final={done:5.1f}%")
