# CRITIQUE.md

## The Prototype Is Not Ready.

Not because it's broken.
Not because it's ugly.
Not because the code is wrong.

Because it doesn't make you feel anything.

---

## What Exists

A 399-line component.
11 images.
21 text elements.
One continuous scroll.
A warm color palette.
A few particles.
A progress bar.

Everything fades in.
Everything fades out.
Everything moves at the same speed.
Everything has the same emotional weight.

---

## What Doesn't Exist

Tension.
Silence.
Anticipation.
A single moment of surprise.
A reason to stop scrolling.
A reason to start again.

---

## Every Weak Moment

### The Opening Is Too Long and Too Empty

0.00–0.06 of the scroll is pure darkness. That's 480vh. Roughly 10–17 seconds of staring at black with a 4px dot that's invisible. A real visitor — not a designer, not someone reviewing for Awwwards, a real person looking for a kitchen — will assume the page is broken. They'll scroll again, see nothing, and leave.

The light point exists but it's too small and too late to matter. It doesn't reach visible opacity until 0.02 and doesn't reach meaningful size until 0.10. That's a long time to ask for trust.

**The darkness should reward patience, not punish it.**

### KITSER and Tagline Fight Each Other

At 0.10, the KITSER wordmark is still blurry and fading in. The tagline "ALL ABOUT KITCHENS" starts. For 4% of the timeline, both are visible, both blurry, both partial. The two most important text elements in the entire experience — the brand name and its meaning — are competing for the same moment.

The user doesn't see "KITSER" resolve into clarity and then see what it means. They see two ghostly layers overlapping.

**The brand name should be alone. It should earn its moment. Then the tagline should appear beneath it.**

### Materials Are Labeled, Not Revealed

STONE appears. There's a stone texture behind it.
WOOD appears. There's a wood texture behind it.
STEEL appears. There's a steel texture behind it.

These are labels. They tell the user what they're looking at. They don't make the user *feel* stone, wood, or steel. The storyboard described "millions of years beneath your cutting board" and specific lighting directions per material. The implementation uses the same warm tint overlay on every image. There's no difference between seeing STONE on a stone texture and reading a product catalog.

**A material should be experienced through light, texture, movement, and time — not named.**

### The Spec Cascade Is Cluttered

At 0.38–0.48, four text elements and two images are simultaneously visible. "STEEL" + "72 layers" + "of folded steel" + "0.1mm edge" appear at 0.01 intervals — effectively simultaneously. For a brand that positions itself as "museum, not supermarket," this is a contradiction.

The storyboard gave the "0.1" number its own dedicated scene — just the number on darkness, pulsing once. That isolation gave it gravity. The implementation stacks it with five other elements. The number means nothing.

**Precision deserves isolation. Not clutter.**

### The Kitchen Reveals Are Too Fast

The first full-bleed kitchen appears at 0.46. The user has been scrolling through darkness, textures, and single words for 46% of the experience. When the kitchen finally appears, it should feel like an arrival — like stepping into a room.

Instead, it's another image in the sequence. It appears at the same cadence as every other image (0.08 intervals). It has the same zoom, the same blur, the same envelope. There's no shift in visual language to say "this is different." There's no pause. There's no held breath.

**The kitchen should be the reward for scrolling through darkness. It should feel earned. It should hold longer than anything before it.**

### The Climax Is Rushed

"THE KITCHEN / IS WHERE / LIFE HAPPENS." — three lines at 0.02 intervals. About 16 wheel notches per line. At moderate scroll speed, 3–5 seconds to read the most important statement in the entire brand story.

The storyboard allocated this moment 5% of the entire experience with a 3-second hold. The implementation gives each line maybe 2–3% of hold time. The emotional peak of the brand is given the same pacing as the address line.

**The climax should be the slowest, most held moment in the experience. It should be impossible to scroll past without feeling it.**

### The Background Transition Fights the Content

At 0.65–0.82, the background transitions from warm dark to linen. The text color flips from white to dark at 0.78 — a hard binary switch. The word "LIGHT" (0.72–0.80) starts in white and ends in dark, with the color flip happening mid-word. This breaks immersion. The user sees the text color change, not the environment change.

**The transition should be imperceptible. The text should track the environment's luminance, not flip at a threshold.**

### There Are No Breathing Moments

Every scroll position has something visible. Every moment has an image, a text element, or both. There is no point in the entire 8000vh where the user sees only darkness, or only a single word, or only a texture without text.

The storyboard explicitly designed "The Darkness Between" — a pure dark pause after the first material. The storyboard designed "The Question" — just text on darkness. The storyboard designed "0.1" — just a number pulsing. These moments of isolation are what create rhythm. Without them, the experience is a flat line.

**The most powerful moments in cinema are the ones where nothing happens.**

### There Is No Variation in Animation Language

Every image: blur-in → scale → fade → blur-out.
Every text: blur-in → drift → scale → fade.
Same envelope. Same timing. Same visual language.

The storyboard described letter-by-letter reveals, elastic easing, screen shake, strikethrough animation, carousel motion, focus pull, slow dolly. None of these exist. Every element is animated with the same gentle fade.

**Uniformity is the enemy of emotion. If everything moves the same way, nothing moves at all.**

### The GSAP Library Is Imported But Never Used

The particles component imports GSAP. The experience component doesn't import GSAP at all. The TimelineEngine, CinematicText, CinematicImage, LightSource, DepthLayer, and Canvas components all exist but are not used by the active experience. There's an entire abandoned architecture sitting in the codebase.

This isn't just dead code. It's evidence that the original vision was more ambitious than what was delivered. The ambition was right. The execution settled.

---

## The Single Biggest Problem

The experience treats all moments as equal.

Every image gets the same fade. Every word gets the same timing. Every transition uses the same easing. There is no contrast between moments — no moment of impact, no pause that lets emotion land, no visual surprise.

The entire brand philosophy is built on the idea that some moments are sacred. A kitchen is where life happens — but only if you pause long enough to feel it.

This experience never pauses.

---

## What "Never Seen a Kitchen Website Like That" Requires

It doesn't require more features.
It doesn't require more images.
It doesn't require better animations.

It requires **rhythm**.

The difference between a film and a slideshow isn't production value. It's timing. A slideshow shows you image after image at a steady cadence. A film holds a shot because the director decided this moment needs to breathe. It cuts quickly because this moment needs urgency. It goes to black because silence is the loudest sound.

The current prototype is a slideshow.

To become a film, it needs:

1. **Contrast in pacing.** Some moments must be slow. Some must be fast. The variation is what creates meaning.

2. **Moments of nothing.** Pure darkness. A single word. A texture without label. These moments give the eye rest and the mind space to feel.

3. ** earned reveals.** The kitchen should not appear at the same cadence as a stone texture. The brand name should not overlap with its tagline. The climax should not be rushed.

4. **Visual variety.** Not every image needs the same blur-in, same zoom, same envelope. Some should slam in. Some should dissolve. Some should appear as if the user discovered them.

5. **Silence.** Let a word sit alone on darkness. Let the user read it, feel it, and then move on. Don't immediately follow with the next element.

6. **Held breath.** When the kitchen appears, stop everything. Let the user absorb it. Don't rush to the next image. The kitchen is the destination — act like it.

The goal is not to make the user think "that was a well-animated website."

The goal is to make the user think "I've never experienced anything like that."

The difference is not technical. It's editorial.
