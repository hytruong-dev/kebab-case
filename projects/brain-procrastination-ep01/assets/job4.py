import json, os
exec(open("make_job.py", encoding="utf-8-sig").read().split("steps = []")[0])
new = [
 ("O48_flame", "A bright stylized flame / campfire fire, coral-red outer flame with amber inner flame, no logs."),
 ("O49_weight_guilt", "A heavy dark slate iron weight (kettlebell-like trapezoid block with a handle on top), big blank front face."),
 ("O50_tangled_knot", "A messy tangled ball of glowing coral yarn / rope knot."),
 ("O51_stranger", "A faceless grey anonymous person silhouette, waist-up, simple flat shape (represents a stranger)."),
 ("O52_fist", "A clenched cartoon fist punching forward, front view, skin tone with a navy sleeve."),
 ("O53_video_card", "A floating online video player window with a big coral play button in the middle and a thin progress bar (no text)."),
 ("O54_door", "A closed wooden door in a simple frame with an amber door handle, front view."),
 ("O55_moon", "A glowing pale crescent moon with two small stars."),
]
steps = [[n, "Same style and palette as the earlier images in this chat. " + p + " " + G] for n, p in new]
os.makedirs("job4", exist_ok=True)
json.dump({"intro": "The attached image shows the MASCOT and the exact art style of this series (flat 2D vector, Kurzgesagt-like). We will make a set of separate illustration assets for ONE animated explainer video in this conversation. Each message asks for exactly ONE image. Keep exactly the same style, line weight and palette as the attached reference in every image.",
  "chat": None, "invariants": STYLE, "steps": steps, "refs": ["projects/brain-procrastination-ep01/assets/ref_mascot.png"]}, open("job4/job.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(steps))
