---
inclusion: manual
---

# tasteskill: Anti-Slop Frontend Skill

> Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI.
> Every rule below is **contextual**. None of it fires automatically. First read the brief, then pull only what fits.

---

## 0. BRIEF INFERENCE (Read the Room Before Anything Else)

Before touching code or tweaking dials, **infer what the user actually wants**. Most LLM design output is bad because the model jumps to a default aesthetic instead of reading the room.

### 0.A Read these signals first
1. **Page kind** - landing (SaaS / consumer / agency / event), portfolio (dev / designer / creative studio), redesign (preserve vs overhaul), editorial / blog.
2. **Vibe words** the user used - "minimalist", "calm", "Linear-style", "Awwwards", "brutalist", "premium consumer", "Apple-y", "playful", "serious B2B", "editorial", "agency-y", "glassy", "dark tech".
3. **Reference signals** - URLs they linked, screenshots they pasted, products they named, brands they're competing with.
4. **Audience** - B2B procurement panel vs. design-conscious consumer vs. recruiter scanning a portfolio. The audience picks the aesthetic, not your taste.
5. **Brand assets that already exist** - logo, color, type, photography. For redesigns, these are starting material, not optional input.
6. **Quiet constraints** - accessibility-first audiences, public-sector, regulated industries, trust-first commerce, kids' products. These constraints OVERRIDE aesthetic preference.

### 0.B Output a one-line "Design Read" before generating
Before any code, state in one line: **"Reading this as: \<page kind> for \<audience>, with a \<vibe> language, leaning toward \<design system or aesthetic family>."**

### 0.C If the brief is ambiguous, ask one question, do not guess

### 0.D Anti-Default Discipline
Do not default to: AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, infinite-loop micro-animations everywhere, Inter + slate-900.

---

## 1. THE THREE DIALS (Core Configuration)

* **`DESIGN_VARIANCE: 8`** - 1 = Perfect Symmetry, 10 = Artsy Chaos
* **`MOTION_INTENSITY: 6`** - 1 = Static, 10 = Cinematic / Physics
* **`VISUAL_DENSITY: 4`** - 1 = Art Gallery / Airy, 10 = Cockpit / Packed Data

### 1.A Dial Inference
| Signal | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| "minimalist / clean / calm / editorial / Linear-style" | 5-6 | 3-4 | 2-3 |
| "premium consumer / Apple-y / luxury / brand" | 7-8 | 5-7 | 3-4 |
| "playful / wild / Dribbble / Awwwards / experimental / agency" | 9-10 | 8-10 | 3-4 |
| "landing page / portfolio / marketing site (default)" | 7-9 | 6-8 | 3-5 |
| "trust-first / public-sector / regulated / accessibility-critical" | 3-4 | 2-3 | 4-5 |

---

## 2. DESIGN ENGINEERING DIRECTIVES

### Typography
* **Display / Headlines:** Default `text-4xl md:text-6xl tracking-tighter leading-none`.
* **Body / Paragraphs:** Default `text-base text-gray-600 leading-relaxed max-w-[65ch]`.
* **Sans font choice:** Discouraged as default: `Inter`. Pick `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi`, or brand-appropriate serif first.
* **SERIF DISCIPLINE:** Serif is very discouraged as the default font for any project. Only acceptable when the brand brief literally names a serif font, or the aesthetic family is genuinely editorial/luxury/publication.
* **Specifically BANNED as defaults:** `Fraunces` and `Instrument_Serif`.

### Color Calibration
* Max 1 accent color. Saturation < 80% by default.
* **THE LILA RULE:** AI Purple / Blue glow is discouraged as default. Use neutral bases (Zinc / Slate / Stone) with high-contrast singular accents.
* **One palette per project.** Do not fluctuate between warm and cool grays.
* **COLOR CONSISTENCY LOCK:** Once an accent color is chosen, it is used on the WHOLE page.

### Layout Diversification
* **ANTI-CENTER BIAS:** Centered Hero sections are avoided when `DESIGN_VARIANCE > 4`. Force "Split Screen", "Left-aligned content / right-aligned asset", "Asymmetric white-space", or scroll-pinned structures.

### Cards & Containers
* Use cards ONLY when elevation communicates real hierarchy.
* **SHAPE CONSISTENCY LOCK:** Pick ONE corner-radius scale for the page and stick to it.

### Interactive UI States
* Always implement: Loading (skeletal), Empty States, Error States, Tactile Feedback.
* **BUTTON CONTRAST CHECK:** Verify button text readable against button background (WCAG AA 4.5:1 min).
* **CTA BUTTON WRAP BAN:** Button text MUST fit on one line at desktop.
* **NO DUPLICATE CTA INTENT:** Two CTAs with the same intent on one page is a fail.

---

## 3. LAYOUT DISCIPLINE (Hard Rules)

* **Hero MUST fit in the initial viewport.** Headline max 2 lines, subtext max 20 words, CTAs visible without scroll.
* **Navigation MUST render on a single line on desktop.** Height cap: 80px max.
* **Section-Layout-Repetition Ban.** Once you use a layout family, it can appear at most ONCE on the page.
* **ZIGZAG ALTERNATION CAP:** Max 2 sections with image+text-split pattern in a row.
* **EYEBROW RESTRAINT:** Maximum 1 eyebrow per 3 sections.
* **Mobile collapse must be explicit per section.**

---

## 4. AI TELLS (Forbidden Patterns)

### Visual & CSS
* NO neon/outer glows by default
* NO pure black (#000000). Use off-black, zinc-950
* NO oversaturated accents
* NO excessive gradient text for large headers
* NO custom mouse cursors

### Layout & Content
* NO 3-column equal feature cards
* NO generic names ("John Doe", "Sarah Chan")
* NO fake-perfect numbers (99.99%, 50%)
* NO startup-slop brand names ("Acme", "Nexus", "SmartFlow")
* NO filler verbs ("Elevate", "Seamless", "Unleash", "Revolutionize")

### Production-Test Tells (banned)
* NO version labels in hero (V0.6, BETA)
* NO section-number eyebrows (001 Capabilities)
* NO em-dash anywhere on the page (use hyphen instead)
* NO decoration text strip at hero bottom
* NO scroll cues
* NO locale/time/weather strips
* NO div-based fake product UI in hero
* NO pills/labels overlaid on images

---

## 5. PERFORMANCE & ACCESSIBILITY

* Animate ONLY `transform` and `opacity`
* **Reduced Motion:** Any motion above intensity 3 MUST honor `prefers-reduced-motion`
* **Dark Mode:** Design for both modes from the start
* **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1
* **Viewport Stability:** NEVER use `h-screen`. ALWAYS use `min-h-[100dvh]`

---

## 6. PRE-FLIGHT CHECK (Run before outputting code)

- [ ] Brief inference declared?
- [ ] ZERO em-dashes anywhere on the page?
- [ ] Page Theme Lock: ONE theme for the whole page?
- [ ] Color Consistency Lock: one accent used identically across all sections?
- [ ] Shape Consistency Lock: one corner-radius system?
- [ ] Button Contrast Check passes?
- [ ] Hero fits viewport (headline ≤ 2 lines, subtext ≤ 20 words)?
- [ ] Navigation on ONE line at desktop?
- [ ] No AI Tells (Inter default, AI-purple, three-equal cards)?
- [ ] Dark mode tokens defined and tested?
- [ ] Mobile collapse explicit?
- [ ] Reduced motion honored?

---

*Source: [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) - MIT License*
