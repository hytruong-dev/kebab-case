# Extend the v1 prompt list with assets for the research beats + doc-v2 hero for the modular bridge, then split into 3 jobs
# (one per Gemini account, each its own single conversation with the mascot reference attached).
import json, os
src = open("make_job.py", encoding="utf-8-sig").read().split("steps = []")[0]
exec(src)
props += [
 ("O37_calculator_money", "Two stacks of green dollar bills side by side, a smaller stack and a slightly taller stack, each with a small amber price tag (blank)."),
 ("O38_aged_mirror", "An oval standing mirror whose reflection shows a kind elderly version of the mascot character with grey hair and the same charcoal turtleneck, smiling."),
 ("O39_piggy_bank", "A coral pink piggy bank with gold coins dropping into it."),
 ("O40_waiter", "A friendly 1920s cafe waiter with a white apron holding a small notepad and a tray, full body."),
 ("O41_guitar_stand", "An acoustic guitar standing on a guitar stand, warm wood colour."),
 ("O42_thermometer", "A medical thermometer and a small first-aid kit side by side (illness)."),
 ("O43_report_card", "A school report card paper with a big red circled grade mark (no readable letters, just a red circle and lines)."),
 ("O44_timer_5min", "A round amber kitchen timer, twist type."),
 ("O45_drawer_phone", "An open wooden desk drawer with a smartphone lying inside it."),
 ("O46_brain_scan_split", "A brain scan image: a side view of the brain with a glowing coral almond-shaped region deep inside and a thin dim connection line to the front of the brain."),
 ("O47_dopamine_leak", "A round glass laboratory flask filled with glowing neon coral-orange liquid that is leaking out through a crack, drops falling."),
]
heroes += [
 ("H7_bridge_handshake", "Inside a brain control room with screens and dials: a calm rational planner in a navy suit shakes hands with a small cute coral fuzzy creature, warm amber and coral highlights, high contrast."),
]
steps = [[n, "Same style and palette as the earlier images in this chat. " + p + " " + G] for n, p in props]
steps += [[n, "Same style and palette as the earlier images in this chat (the mascot, if shown, is the same character as the attached reference). " + p + " " + WIDE] for n, p in heroes]
mas = [[n, "EXACTLY the same mascot character as the attached reference image (same face, hair, sweater, emblem, proportions, line weight). " + MASCOT + ", " + e + ". " + G] for n, e in exprs]
mas.append(["M15_sleepless", "EXACTLY the same mascot character as the attached reference image. " + MASCOT + ", sitting up in bed at night under a blanket, wide-awake bloodshot eyes staring, worried face. " + G])
heroes_steps = [s for s in steps if s[0][0] in "HT"]
prop_steps = [s for s in steps if s[0][0] not in "HT"]
first = mas[0]
rest = mas[1:] + heroes_steps + prop_steps
jobs = [[first], [], []]
for i, s in enumerate(rest): jobs[i % 3].append(s)
intro = ("The attached image shows the MASCOT and the exact art style of this series (flat 2D vector, Kurzgesagt-like). We will make a set of separate "
         "illustration assets for ONE animated explainer video about the psychology of procrastination in this conversation. Each message asks for exactly ONE "
         "image. Keep exactly the same style, line weight, palette and the same mascot as the attached reference in every image.")
ref = "projects/brain-procrastination-ep01/assets/ref_mascot.png"
for k, st in enumerate(jobs):
    os.makedirs(f"job{k+1}", exist_ok=True)
    j = {"intro": intro if k else intro.replace("The attached image shows the MASCOT and", "Use"), "chat": None, "invariants": STYLE, "steps": st}
    if k: j["refs"] = [ref]
    json.dump(j, open(f"job{k+1}/job.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(k + 1, len(st), [s[0] for s in st][:4])
