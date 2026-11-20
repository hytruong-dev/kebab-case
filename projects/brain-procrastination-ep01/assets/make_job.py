import json
STYLE = ("STYLE for every image: flat 2D vector illustration, modern minimalist editorial infographic style (like Kurzgesagt), clean geometric shapes, "
         "crisp edges, subtle cel-shading, palette: deep navy #0F172A, slate #1E293B, warm amber #F59E0B, coral #F43F5E, off-white #F8FAFC, soft teal #2DD4BF.")
G = ("Square 1:1. Isolated single subject centered with generous margin. BACKGROUND: every pixel that is not the subject is ONE flat solid pure chroma-key green "
     "(#00FF00) right up to all four edges: no gradient, no shadow on the green, no green glow, no green inside the subject. No text, no letters, no numbers.")
WIDE = ("16:9 landscape, FULL-BLEED edge to edge, no frame, no border. Solid flat dark navy blue background #0F172A. No text, no letters, no numbers.")
MASCOT = ("minimalist flat 2D vector mascot character, a friendly stylized thinker with clean geometric proportions, large expressive white eyes, neat dark slate hair, "
          "wearing a charcoal turtleneck sweater with a tiny glowing amber brain emblem on the chest, waist-up portrait")
SAME = "EXACTLY the same mascot character as the first image (same face, hair, sweater, emblem, proportions, line weight). "
exprs = [
 ("M01_explaining", "calm confident smile, open hand gesture as if explaining a concept, welcoming posture"),
 ("M02_pointing", "pointing index finger to the right side of the frame, looking toward the viewer with raised eyebrows, informative pose"),
 ("M03_shocked", "wide shocked eyes, hands raised near head with small glowing amber lightning sparks around head, amazed expression"),
 ("M04_overthinking", "dizzy spiral eyes, a tangled glowing coral yarn ball floating above head, overwhelmed expression"),
 ("M05_panicked", "panicked wide eyes, sweat drop on forehead, hands gripping cheeks in alarm, subtle coral warning glow"),
 ("M06_distracted", "slouching posture, staring blankly at a glowing smartphone held in both hands, face lit in warm amber light, zoned-out expression"),
 ("M07_eureka", "bright happy eyes, index finger raised upward, a glowing warm amber lightbulb floating directly above head"),
 ("M08_burnout", "slumped shoulders, heavy half-closed tired eyes, a small low-battery icon glowing red floating beside head"),
 ("M09_smug", "smug smirk, arms crossed proudly, chin tilted up slightly, overconfident attitude"),
 ("M10_victorious", "cheerful relieved smile, giving a confident thumbs up, relaxed upright posture"),
 ("M11_polishing", "sitting, sheepish guilty smile, polishing a small potted desk plant with a tiny cloth, avoiding eye contact"),
 ("M12_running", "full body, running fast to the right in a panic, arms flailing, looking back over the shoulder in fear"),
 ("M13_relaxing", "full body, lying relaxed on a cosy amber couch, holding a glowing smartphone, carefree smile"),
 ("M14_stressed_papers", "full body, panicking while holding up a huge tottering stack of papers above head, sweat drops"),
 ("M15_sleepless", "sitting up in bed at night under a blanket, wide-awake bloodshot eyes staring, worried face"),
]
props = [
 ("C01_ceo", "A tiny calm rational planner character in a neat navy business suit and amber tie holding a rolled blueprint, confident smile, full body (represents the brain's Prefrontal Cortex)."),
 ("C02_amygdala", "A small cute primitive caveman-like creature with coral-red fuzzy skin, big nervous eyes, holding a coral warning whistle, full body (represents the brain's Amygdala)."),
 ("C03_caveman", "A prehistoric caveman ancestor in a fur tunic running fast to the right in fear, full body, side view."),
 ("C04_sabertooth", "A sabertooth tiger running to the right, mouth open, full body, side view, amber and slate colours."),
 ("O01_head_section", "Side-profile silhouette of a human head facing right in slate blue, with the skull cut open showing a large soft pink brain inside, the brain occupies most of the head."),
 ("O02_brain_glow", "A glowing anatomical brain seen from the side, soft pink with amber glowing highlights."),
 ("O03_fmri", "A medical fMRI brain scanner machine, a large ring with a sliding bed, white and slate, side three-quarter view."),
 ("O04_laptop_blank", "An open laptop seen from the front, the screen shows a completely blank white document page with a blinking cursor bar."),
 ("O05_smartphone", "A smartphone seen from the front, glowing screen with colourful app icons and a red notification badge."),
 ("O06_wall_clock", "A round wall clock with a white face, navy rim, tick marks, NO hands."),
 ("O07_papers_stack", "A tall heavy stack of messy office papers and folders, slightly leaning."),
 ("O08_boulder", "A giant round grey boulder rock with flat cel-shading."),
 ("O09_pebble", "A tiny smooth amber pebble."),
 ("O10_padlock_closed", "A closed amber padlock."),
 ("O11_padlock_open", "An open amber padlock with the shackle released."),
 ("O12_heart", "A glowing soft coral-pink heart with a gentle shine."),
 ("O13_dopamine_flask", "A round glass laboratory flask filled with glowing amber liquid and small bubbles, neon glow."),
 ("O14_retro_computer", "An old beige retro computer with a CRT monitor showing a simple green-on-black blank screen, keyboard in front."),
 ("O15_bell", "A coral-red notification bell icon with a small amber badge."),
 ("O16_alarm_button", "A big red emergency alarm button on a slate base with a striped warning ring."),
 ("O17_spreadsheet", "A floating application window showing a grey spreadsheet grid with empty cells, slightly intimidating."),
 ("O18_tax_form", "A long tax form document with dense small grey lines and boxes and a red stamp mark (no readable text)."),
 ("O19_fuel_can", "A coral-red jerry fuel can tipped over, pouring liquid."),
 ("O20_cookie", "A small chocolate chip cookie."),
 ("O21_treasure_chest", "A big open treasure chest overflowing with gold coins."),
 ("O22_balance_scale", "An empty balance scale with two pans, level, brass and slate."),
 ("O23_briefcase", "A navy business briefcase."),
 ("O24_graduation_cap", "A graduation cap with an amber tassel."),
 ("O25_calendar", "A desk calendar page with one day circled in coral."),
 ("O26_gears", "Two interlocking amber gears."),
 ("O27_telescope", "A small brass telescope on a tripod pointing up-right."),
 ("O28_folders", "A messy pile of colourful computer folder icons."),
 ("O29_keyboard", "A computer keyboard, top view."),
 ("O30_pencils", "A bundle of yellow pencils."),
 ("O31_couch", "An empty cosy amber couch, side view."),
 ("O32_dumbbell", "A dumbbell."),
 ("O33_textbook", "A closed thick textbook with a bookmark."),
 ("O34_tv_remote", "A TV remote control."),
 ("O35_lightbulb", "A glowing warm amber lightbulb."),
 ("O36_almond", "A single almond nut."),
]
heroes = [
 ("H1_desk_hook", "A stressed minimalist character sitting at a desk in front of a glowing blank laptop screen, absurdly polishing a desk plant with a tiny cloth while a giant clock ticks in the background, warm amber and coral highlights, high contrast."),
 ("H2_brain_roommates", "Cross-section infographic of a human head showing two contrasting characters inside the brain: a calm rational planner in a suit holding a blueprint in the front, and a panicked primitive creature pressing a red alarm button in the center, warm amber and coral highlights, high contrast."),
 ("H3_present_future", "Infographic illustration showing two identical minimalist characters separated by a dashed timeline barrier: the left character relaxes on a couch holding a glowing smartphone while tossing a heavy stack of papers over the barrier to the stressed character on the right, warm amber and coral highlights, high contrast."),
 ("H4_doom_loop", "Circular flowchart infographic diagram showing a glowing endless loop of five minimalist icons representing a ticking clock, a tangled knot of anxiety, a smartphone distraction, a heavy weight of guilt, and a rising stress bar, warm amber and coral highlights, high contrast."),
 ("H5_three_hacks", "Three-panel infographic showing three productivity hacks: panel one shows a tiny pebble pushing a giant boulder over a hill, panel two shows a smartphone locked behind a small barrier while a laptop glows open, panel three shows a glowing heart resetting a red stress gauge to calm green, warm amber and coral highlights, high contrast."),
 ("H6_outro", "A minimalist character happily completing a glowing progress bar at a clean desk while two small friendly brain mascots high-five inside a translucent thought bubble above, warm amber and coral highlights, high contrast."),
 ("T1_thumb_tugofwar", "YouTube thumbnail composition, large side-profile silhouette of a human head cut open, inside the brain a tiny rational character in a suit pulls a glowing rope against a mischievous coral-red creature pulling toward a glowing smartphone, dramatic tension, high contrast warm amber and coral glow, clean negative space on top left."),
 ("T2_thumb_mousetrap", "YouTube thumbnail focal visual, a glowing anatomical brain, a giant minimalist golden-amber mousetrap set on top of the brain baited with a glowing coral-red notification bell icon, dramatic rim lighting, clean bold shapes, high contrast."),
 ("T3_thumb_split", "Split-screen YouTube thumbnail divided vertically by a glowing dashed line, left side: the mascot relaxing on a couch scrolling a glowing phone in calm blue tones; right side: the exact same mascot panicking while holding up a collapsing giant mountain of papers and ticking clocks in urgent coral-red tones, high contrast."),
]
steps = []
for i, (n, e) in enumerate(exprs):
    steps.append([n, ("" if i == 0 else SAME) + MASCOT + ", " + e + ". " + G])
for n, p in props:
    steps.append([n, "Same style and palette as the earlier images. " + p + " " + G])
for n, p in heroes:
    steps.append([n, "Same style and palette as the earlier images (the mascot, if shown, is the same character). " + p + " " + WIDE])
job = {"intro": "We will make a set of separate illustration assets for ONE animated explainer video about the psychology of procrastination in this conversation. Each message asks for exactly ONE image. Keep exactly the same style, line weight, palette and mascot in every image.",
       "chat": None, "invariants": STYLE, "steps": steps}
json.dump(job, open("projects/brain-procrastination-ep01/assets/job.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(steps))
