# Unified Design Reference

**Purpose:** A single, authoritative operating manual synthesizing the design principles from four installed design skills. This document is consulted BEFORE and DURING every website redesign to ensure production-ready, non-AI-sloppy output.

**Source skills (installed at `/home/z/my-project/skills/`):**
1. `taste-skill` (Leonxlnx) — Anti-slop frontend framework; brief inference + 3 dials + 60-item pre-flight check
2. `emilkowalski-skills` (Emil Kowalski) — Animation craft + Apple fluid-interface principles
3. `impeccable` (Paul Bakaus) — Register doctrine (Brand vs Product) + 23 polish commands + 46-rule detector
4. `open-design` (nexu-io) — 154 design systems + 21 Hallmark macrostructures + 13 craft reference files

---

## 0. THE NORTH STAR

> **"If someone could look at this interface and say 'AI made that' without doubt, it's failed."** — impeccable

Every decision below serves this single test. The four skills converge on one insight: **AI-generated UI has a recognizable fingerprint, and escaping it requires disciplined, intentional choices at every layer — structure, color, type, motion, copy.**

---

## 1. PROCESS — Read the Room Before Touching Code

### 1.1 Brief Inference (taste-skill §0)
Before writing any code, declare a one-line **Design Read**:
> *"Reading this as: [page kind] for [audience], with a [aesthetic language] direction, leaning toward [stack]."* 

Read six signals first: page kind, vibe words, reference signals, audience, existing brand assets, quiet constraints (accessibility, regulated, public-sector).

### 1.2 Register Decision (impeccable)
Decide ONE register — it shapes everything downstream:
- **Brand** — design *IS* the product (marketing, landing, portfolios). Distinctiveness is the bar.
- **Product** — design *SERVES* the product (apps, dashboards, tools). Earned familiarity is the bar.

### 1.3 Set Three Dials (taste-skill)
Baseline `8 / 6 / 4`, calibrated to brief:
- **DESIGN_VARIANCE** (1=symmetry → 10=artsy chaos)
- **MOTION_INTENSITY** (1=static → 10=cinematic)
- **VISUAL_DENSITY** (1=airy gallery → 10=cockpit)

### 1.4 The Two-Altitude Slop Test (impeccable)
- **First-order:** Could someone guess theme+palette from category alone? (e.g. "fintech → navy + green"). Rework until they can't.
- **Second-order:** Could someone guess aesthetic family from category+anti-references? (e.g. "AI tool not-SaaS-cream → editorial-typographic"). Rework until both are non-obvious.

### 1.5 Name a Real Reference (impeccable)
Before picking colors: *"Klim Type Foundry orange drench"*, *"Stripe purple-on-white restraint"*, *"Vercel pure-black monochrome"*. **Unnamed ambition becomes beige.**

---

## 2. STRUCTURE — Escape the AI Page Fingerprint

### 2.1 Pick a Macrostructure (Hallmark)
**Structural sameness IS the AI fingerprint, not visual sameness.** Most AI UIs are visually distinct but structurally identical: hero → 3 features → CTA → footer.

21 named macrostructures to choose from (pick ONE per page, state it in a code comment):
Bento Grid · Long Document · Marquee Hero · Stat-Led · Workbench · Conversational FAQ · Manifesto · Photographic · Quote-Led · Specimen · Catalogue · Letter · Index-First · Narrative Workflow · Split Studio · Feature Stack · Type Specimen · Portfolio Grid · Map/Diagram · Ecosystem Index · Component Playground.

### 2.2 Layout Discipline (taste-skill + impeccable)
- **BANNED: 3-column equal feature cards.** Use 2-col zig-zag, asymmetric grid, bento, or horizontal scroll.
- **Hero MUST fit initial viewport.** Headline ≤ 2 lines, subtext ≤ 20 words, CTA visible without scroll. Top padding ≤ `pt-24`.
- **Hero stack: max 4 text elements** (eyebrow OR brand-strip + headline + subtext + CTAs). No trust strips, pricing teasers, or feature bullets in hero.
- **"Used by" logo wall goes UNDER the hero, never inside it.**
- **Split-header BANNED:** no "left big headline + right small explainer paragraph". Stack vertically instead.
- **Eyebrow restraint (most-violated rule):** max 1 eyebrow per 3 sections. Hero counts as 1. Default to dropping eyebrows entirely.
- **Section-Layout-Repetition Ban:** each layout family appears at most ONCE per page. 8 sections → ≥ 4 different layout families.
- **Zigzag Alternation Cap:** max 2 consecutive image+text-split sections. The 3rd is a fail.
- **Bento Cell Count Rule:** N items → exactly N cells. No empty cells. Use `grid-flow-dense`. ≥ 2-3 cells need real visual variation.
- **Long lists (>5 items) need a different component**, not a longer list: 2-col split, card grid, tabs/accordion, carousel, marquee.
- **Grid over Flex-Math:** NEVER `w-[calc(33%-1rem)]`. ALWAYS `grid grid-cols-1 md:grid-cols-3 gap-6`.
- **Viewport stability:** NEVER `h-screen`. ALWAYS `min-h-[100dvh]` (iOS Safari address bar).
- **Container:** `max-w-[1400px] mx-auto` or `max-w-7xl`.
- **Spacing by density dial:** 1-3 → `py-32` to `py-48`; 4-7 → `py-16` to `py-24`; 8-10 → tight, no card boxes, 1px dividers.
- **Vary spacing for rhythm:** tight 8-12px within groups, generous 48-96px between sections. Equal padding everywhere = no rhythm.

### 2.3 Theme & Shape Locks (taste-skill)
- **Page Theme Lock:** ONE theme (light/dark/auto) for the whole page. No mid-page flips.
- **Color Consistency Lock:** ONE accent color, used identically across ALL sections. A warm-grey site does not suddenly get a blue CTA in section 7.
- **Shape Consistency Lock:** ONE corner-radius scale per page (all-sharp / all-soft 12-16px / all-pill). Round buttons on square cards = broken design.

---

## 3. COLOR — Kill the AI Purple Default

### 3.1 The Cardinal Bans
- **NO default Tailwind indigo/violet/purple as accent** (`#6366f1`, `#4f46e5`, `#8b5cf6`, `#7c3aed`, `#a855f7`).
- **NO purple→blue "trust" gradient hero.**
- **NO pure black `#000000`** — use off-black (zinc-950, warm near-black).
- **NO pure white `#ffffff`** — use off-white.
- **NO gray text on colored backgrounds** — use a darker shade of the bg hue or a transparency of the text color.
- **NO oversaturated accents** — desaturate to blend with neutrals.
- **NO gradient text** (`background-clip: text` + gradient) — decorative, never meaningful. Use solid color; emphasize via weight/size.

### 3.2 Use OKLCH (impeccable)
OKLCH is perceptually uniform — equal lightness steps LOOK equal. Hold chroma+hue constant, vary lightness. **Reduce chroma as you approach white or black** (high chroma at extremes looks garish).

### 3.3 Four Color Strategies (impeccable — pick BEFORE picking colors)
- **Restrained** — tinted neutrals + one accent ≤10%. Product default; brand minimalism.
- **Committed** — one saturated color carries 30-60% of surface. Brand default.
- **Full palette** — 3-4 named roles, each deliberate. Brand campaigns; product data viz.
- **Drenched** — the surface IS the color. Brand heroes, campaign pages.

### 3.4 The 4-Layer Palette (open-design craft)
- **Neutrals** 70-90% (`--bg`, `--surface`, `--fg`, `--muted`, `--border`)
- **Accent** 5-10% (`--accent` ONLY — never invent a second accent)
- **Semantic** 0-5% (`--success`, `--warn`, `--danger`)
- **Effect** <1%

### 3.5 The 2-Accent-Cap (open-design)
**At most 2 visible uses of `--accent` per screen** (typical pair: eyebrow/chip + primary CTA). Links count as accent. Hover/focus rings count as accent. Ration accordingly.

### 3.6 Tinted Neutrals Toward THIS Brand's Hue (impeccable)
Tint neutrals at 0.005-0.015 chroma toward the brand's hue, NOT toward a default warm or cool. "Pure gray is dead." Always-warm and always-cool are the two laziest defaults and create monoculture.

### 3.7 The Cream/Sand/Beige Ban (impeccable — 2026 AI default)
The warm-neutral band (OKLCH L 0.84-0.97, C < 0.06, hue 40-100) reads as cream/sand/paper regardless of name. Token names `--paper`, `--cream`, `--sand`, `--bone`, `--linen`, `--parchment` are tells. If brief is "warm/editorial", do NOT translate to near-white warm bg. Carry warmth via accent + typography + imagery.

### 3.8 Contrast Floors (WCAG 2.2 AA)
- Body text ≤16px: **4.5:1**
- Large text (≥18px regular or ≥14px bold): **3:1**
- Placeholder text: **4.5:1** (same as body)
- UI components & focus indicators: **3:1**
- Most common failure: muted gray body on tinted near-white. If contrast is close, bump body toward ink end of ramp.

### 3.9 Dark Mode (impeccable)
- Dark mode is NOT inverted light mode.
- Build 3-step surface scale where higher elevations are LIGHTER (15% / 20% / 25% lightness).
- Same hue/chroma as brand; vary only lightness.
- Reduce body text weight slightly (350 vs 400) — light text on dark reads heavier.
- `color-scheme: dark` on `<html>` (fixes scrollbar, inputs).
- Use semi-transparent white borders `rgba(255,255,255,0.08)` over solid dark borders.

### 3.10 Token Architecture
Two layers: **primitive** (`--blue-500`) + **semantic** (`--color-primary: var(--blue-500)`). For dark mode, only redefine the semantic layer. Name tokens by purpose (`--text-body`), not value (`--font-size-16`).

### 3.11 60-30-10 Is About Visual Weight, Not Pixel Count
60% neutral backgrounds/whitespace, 30% secondary (text/borders/inactive), 10% accent (CTAs/highlights/focus). Accent colors work BECAUSE they're rare. Overuse kills their power.

---

## 4. TYPOGRAPHY — The Biggest Lift Per Unit of Risk

### 4.1 The Reflex-Reject List (impeccable + taste-skill)
**BANNED as defaults** (these are the training-data AI favorites):
- **Sans:** Inter, Outfit, Plus Jakarta Sans, DM Sans, Space Grotesk, IBM Plex Sans
- **Serif:** Fraunces, Newsreader, Lora, Crimson (all variants), Playfair Display, Cormorant (all variants), Instrument Serif
- **Mono:** IBM Plex Mono, Space Mono

### 4.2 Approved Alternatives
- **Sans:** Geist, Cabinet Grotesk, Satoshi, Outfit (only if not default), system-ui
- **Pairings:** Geist + Geist Mono · Satoshi + JetBrains Mono · Cabinet Grotesk + Inter Tight
- **Serif discipline:** "Serif is very discouraged as the default. 'It feels premium/editorial' is NOT a reason. The agent's 'creative brief = serif' reflex is the single most-tested AI tell."

### 4.3 Font Selection Procedure (impeccable — run for every brand project)
1. Write three physical-object voice words: "warm and mechanical and opinionated" — NOT "modern" or "elegant".
2. List three fonts you'd reach for by reflex. If any are on the reflex-reject list, reject.
3. Browse a real catalog (Google Fonts, Pangram Pangram, Future Fonts, Klim, Velvetyne, ABC Dinamo) with the three words. Find the font as a **physical object**: a museum caption, a 1970s terminal manual, a fabric label, a concert poster, a mid-century diner receipt.
4. Cross-check: "Elegant" ≠ serif. "Technical" ≠ sans. "Warm" ≠ Fraunces. **If the final pick lines up with your original reflex, start over.**

### 4.4 Emphasis Rule (taste-skill)
When emphasizing a word in a headline, use **italic or bold of the SAME font**. Never inject a random serif word into a sans headline. "Mixed-family emphasis is amateur."

### 4.5 The Letter-Spacing Floors (open-design — most-skipped rule, no exceptions)
| Size | Letter-spacing |
|---|---|
| Body 14-18px | `0` |
| Small 11-13px | `0.01em` to `0.02em` |
| UI labels / button text | `0.02em` |
| **ALL CAPS (required)** | `0.06em` to `0.1em` |
| Headings ≥32px | `-0.01em` to `-0.02em` |
| Display ≥48px | `-0.02em` to `-0.03em` |

**ALL CAPS without ≥0.06em tracking is a P0 defect.** Display ≥32px without negative tracking is a P0 defect.

### 4.6 Display Heading Ceiling
- `clamp()` max ≤ 6rem (~96px). "Above that the page is shouting, not designing."
- Letter-spacing floor ≥ -0.04em. "Anything tighter and letters touch; cramped, not designed."
- **H1 MUST NEVER exceed 2-3 lines.** 4+ lines is a catastrophic failure — make font smaller, container wider.

### 4.7 Italic Descender Clearance (taste-skill — mandatory)
When italic is used in display type and the word contains a descender (`y g j p q`), `leading-none` clips it. Use `leading-[1.1]` minimum + `pb-1` or `mb-1` reserve.

### 4.8 The 3-Weight System (open-design)
- **Read:** 400/450
- **Emphasize:** 510/550
- **Announce:** 590/600

Weight 700+ rarely needed. Weight inversion at top is a valid pattern (h1 at 100 thin, h2 at 300 heavier — "Do not normalize the two weights").

### 4.9 Hierarchy = 5 Levers, Not Just Size (open-design)
Scale, weight, spacing, tracking, alignment. **At least two must work in the same direction** for the dominant element. Anti-patterns: size-only hierarchy; symmetrical emphasis (two co-primaries).

### 4.10 Body Text
- Line length: 50-75 chars (`max-width: 65ch`).
- Line height: 1.5-1.6 body; 1.0-1.2 display/H1 ≥32px.
- Min 16px body. Use `rem`/`em`, never `px` for body text.
- `text-wrap: balance` on h1-h3; `text-wrap: pretty` on long prose.
- Light text on dark: bump line-height 0.05-0.1, add letter-spacing 0.01-0.02em, optionally step weight up one notch.
- `font-variant-numeric: tabular-nums` for data/numbers.

### 4.11 Font Loading
- `font-display: swap` + metric-matched fallbacks (`size-adjust`, `ascent-override`, `descent-override`).
- `font-optical-sizing: auto` for variable fonts.
- Preload critical-weight body font only.
- Variable fonts for 3+ weights.
- NEVER link Google Fonts via `<link>` in production. Use `next/font` or self-host `@font-face`.

---

## 5. MOTION — Motivated, Never Decorative

### 5.1 The 4-Question Decision Framework (emilkowalski — ask in order)
1. **Should this animate at all?** Frequency table:
   - 100+/day (keyboard shortcuts, ⌘K) → **NO animation. Ever.**
   - Tens/day (hover, list nav) → remove or drastically reduce
   - Occasional (modals, drawers, toasts) → standard
   - Rare/first-time (onboarding) → can add delight
2. **What is the purpose?** Must be: spatial consistency / state indication / explanation / feedback / preventing jarring change. "It looks cool" is NOT valid.
3. **What easing?** entering/exiting → `ease-out`; on-screen morph → `ease-in-out`; hover/color → `ease`; constant → `linear`; default → `ease-out`. **NEVER `ease-in` on UI.**
4. **How fast?** See duration table.

### 5.2 Duration Table
| Element | Duration |
|---|---|
| Button press feedback | 100-160ms |
| Tooltips, small popovers | 125-200ms |
| Dropdowns, selects | 150-250ms |
| Modals, drawers | 200-500ms |
| Entrance animations | 300-500ms (max 800ms) |
| **UI animations** | **≤ 300ms** (hard ceiling) |
| Exit animations | ~75% of enter duration |
| Perceived-instant threshold | < 80ms feels instant |

### 5.3 Custom Easing Tokens (define ONCE, use everywhere)
```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```
**Built-in CSS easings (`ease`, `linear`, `ease-in`) are too weak.** Don't hand-roll curves — use easing.dev / easings.co. **NEVER bounce/elastic — they feel dated and draw attention to the animation itself.**

### 5.4 Physicality & Origin
- **NEVER `scale(0)`.** "Nothing in the real world appears from nothing." Start from `scale(0.9-0.97)` + `opacity: 0`.
- **Origin-aware popovers:** scale from the trigger, not center:
  ```css
  transform-origin: var(--radix-popover-content-transform-origin); /* Radix */
  ```
  **Modals are exempt** — they stay centered; `transform-origin: center` is correct.
- **Button press:** `transform: scale(0.97)` on `:active`, `transition: transform 160ms ease-out`. Subtle (0.95-0.98). Applies to ANY pressable element.

### 5.5 Asymmetric Timing
> "Slow where the user is deciding, fast where the system responds."
Deliberate actions (press, hold, destructive confirm) animate slower; system responses snap. Symmetric timing on press-and-release is a finding.
```css
.overlay { transition: clip-path 200ms ease-out; }            /* release: fast */
.button:active .overlay { transition: clip-path 2s linear; }  /* press: slow */
```

### 5.6 Performance — Non-Negotiable
- **Animate ONLY `transform` and `opacity`.** Never `width`/`height`/`margin`/`padding`/`top`/`left` (trigger layout + paint).
- **NEVER `transition: all`** — animates unintended properties off-GPU.
- **Framer Motion `x`/`y`/`scale` shorthands are NOT hardware-accelerated** — they use rAF on main thread, drop frames under load. Use full transform string:
  ```jsx
  // BAD (drops frames)
  <motion.div animate={{ x: 100 }} />
  // GOOD (GPU-accelerated)
  <motion.div animate={{ transform: "translateX(100px)" }} />
  ```
- **Don't drive child transforms via CSS variable on parent** — style recalc storm. Set `transform` directly on element.
- **CSS animations beat JS under load** — they run off main thread. Use CSS for predetermined motion, JS for dynamic/interruptible.
- Keep transition-time `filter: blur()` under 20px — heavy blur is expensive (especially Safari).
- For accordions: use `grid-template-rows: 0fr → 1fr` instead of `height: auto`.

### 5.7 Interruptibility (Apple — single most important principle)
- Never lock out input during a transition.
- Always animate from the PRESENTATION (current) value, not the target.
- Avoid CSS transitions/keyframes for gesture-driven motion — **springs retarget from current velocity**.
- Decompose 2D motion into independent X and Y springs.

### 5.8 Springs (Apple-style)
```js
{ type: "spring", duration: 0.5, bounce: 0.2 }
```
- **Damping ratio 1.0** = critically damped (no bounce). `< 1.0` = overshoots.
- Keep bounce subtle (0.1-0.3). Reserve visible bounce for drag-to-dismiss and playful moments.
- Critically-damped (bounce: 0) for most UI.

### 5.9 Stagger
- 30-80ms between items. Longer feels slow.
- Stagger is decorative — **never block interaction while it plays**.
- Cap total stagger time: 10 items × 50ms = 500ms max.
- Use CSS: `animation-delay: calc(var(--i, 0) * 50ms)` with `style="--i: 0"` on each item.

### 5.10 FORBIDDEN Animation Patterns (taste-skill §5.D)
- `window.addEventListener("scroll", ...)` — use Motion `useScroll()` / GSAP ScrollTrigger / IntersectionObserver / CSS `animation-timeline: view()`.
- `useState` for continuous values (mouse position, scroll progress, pointer physics) — use Motion `useMotionValue` / `useTransform` / `useScroll`.
- `requestAnimationFrame` loops touching React state.
- Mixing GSAP/Three.js with Motion in same component tree — they fight over frames.
- `@keyframes` on toasts/toggles/anything added rapidly — use transitions.
- Marquee max-ONE-per-page. Two+ reads as lazy filler.

### 5.11 Accessibility
- **`prefers-reduced-motion`** — gentler, NOT zero. Keep opacity/color transitions that aid comprehension; remove movement/position changes.
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
  ```
  Then selectively override per-component to keep gentle opacity feedback.
- **Gate hover motion** behind `@media (hover: hover) and (pointer: fine)` — touch devices fire false hovers on tap.
- Also respect `prefers-reduced-transparency: reduce` and `prefers-contrast: more`.
- **WCAG flashing:** ≤ 3 flashes in any 1-second period.
- **Looping motion:** carousels cap 3-5 cycles then pause; skeleton shimmer only until content lands; any motion >5s needs pause control.

### 5.12 Reveal Must Enhance an Already-Visible Default
Don't gate content visibility on a class-triggered transition — transitions pause on hidden tabs and headless renderers, so the reveal never fires and the section ships blank.

---

## 6. COMPONENTS & INTERACTION — The 8 States

### 6.1 Every Interactive Component Needs All 8 States
default, hover, focus, active, disabled, loading, error, success. "Missing states create confusion and broken experiences."

### 6.2 Focus
- **NEVER `outline: none` without replacement.** Use `:focus-visible` (keyboard sees ring, mouse doesn't):
  ```css
  button:focus { outline: none; }
  button:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
  ```
- Focus ring: high contrast (3:1 min), 2-3px thick, offset from element, consistent everywhere.
- Focus rings must NOT animate in — instant on focus.

### 6.3 Forms
- **Label ABOVE input.** Helper text optional but present in markup. Error text BELOW input.
- **NEVER placeholder-as-label.** Placeholders disappear on input.
- **Validate on blur**, not every keystroke (exception: password strength). Once invalid, re-validate on `input` so error clears the moment input becomes valid.
- **Style off `:user-invalid`**, NOT `:invalid` (fires on page load — loudest "added without testing" signal).
- **Preserve user input on error** (34% of checkouts wipe credit-card field on unrelated error — direct abandonment cause).
- Error message formula: (1) What happened? (2) Why? (3) How to fix? Don't blame user.
- Adaptive error messages: 4-7 distinct messages per high-traffic complex field (98% of sites use generic catch-all).
- For numeric IDs (ZIP, OTP, card): `<input type="text" inputmode="numeric" pattern="[0-9]*">` — NOT `type="number"`.

### 6.4 Loading States
- **Skeleton screens > spinners.** They preview content shape and feel faster.
- Loading indicator by expected duration:
  - 0-300ms: none (render sync)
  - 300ms-2s: subtle spinner/skeleton
  - 2-10s: skeleton matched to layout
  - 10-30s: determinate progress bar with cancel
  - 60s+: stop animation, show error with retry/cancel
- **Spinners that flash = defect.** Delay-show 150ms or min-visible 300ms.

### 6.5 Empty States
First-use: illustration + headline + value sentence + primary CTA. "No projects yet. Create your first one to get started." — NOT just "No items".

### 6.6 Modals & Overlays
- **Modal as first thought is laziness.** Exhaust inline/progressive alternatives first.
- Use native `<dialog>.showModal()` for focus trap, or `inert` attribute.
- **Popover API** for tooltips/dropdowns/non-modal overlays — places in top layer, above all z-index/overflow. No portal needed.
- Dropdowns in `overflow: hidden/auto` get clipped — use Popover API, `position: fixed`, or portal.

### 6.7 Undo > Confirmation Dialogs
Users click through confirmations mindlessly. Remove immediately, show undo toast, actually delete after toast expires. Confirmation ONLY for truly irreversible/high-cost/batch operations.

### 6.8 Cards
- **Cards are the lazy answer.** Use only when elevation communicates real hierarchy. Otherwise group with `border-t`, `divide-y`, or negative space.
- **NEVER nest cards inside cards.**
- When a shadow is used, **tint it to the background hue.** No pure-black drop shadows on light backgrounds.

### 6.9 shadcn/ui Rule
**NEVER ship shadcn/ui in default state.** Customize radii, colors, shadows, typography to the project aesthetic. One design system per project — don't mix Material with shadcn.

### 6.10 Icons
- **NEVER hand-roll SVG icons.** Use Phosphor → HugeIcons → Radix → Tabler (priority order). Lucide discouraged (AI default).
- One family per project. Standardize `strokeWidth` globally.
- **NEVER emoji as feature icons** (`✨`, `🚀`, `🎯`, `⚡`, `🔥`, `💡`). Replace with icon-library glyphs.
- **NEVER animate `<img>` on hover** (Gemini tell). If a card needs hover feedback, animate bg/border/shadow — never the image.

### 6.11 Touch Targets
- WCAG 2.5.8 AA floor: **24×24 CSS px**.
- AAA / iOS HIG: **44×44px**.
- Expand hit area with padding/pseudo-element when visual is smaller.

### 6.12 Tactile Feedback
On `:active`, use `-translate-y-[1px]` or `scale-[0.98]`.

---

## 7. IMAGES & ASSETS — Real, Not Faked

### 6.1 Priority Order (taste-skill)
1. **Image-generation tool first** — if available, MUST use for section-specific assets.
2. **Real web images second** — `https://picsum.photos/seed/{descriptive-seed}/{w}/{h}`.
3. **Last resort:** clearly-labeled placeholder slots (`<!-- TODO: hero product photo, 1600x1200 -->`).

> "Even minimalist sites need real images. A pure-text page is not minimalism. It is incomplete work."

### 7.2 BANNED Asset Patterns
- **Div-based fake screenshots** (fake task lists, fake dashboards, fake terminals from styled divs) — #1 LLM-design tell. Use real screenshot, image-gen, real component preview, or skip entirely.
- **Broken Unsplash links** — use picsum.photos/seed/ or generated.
- **Generic text wordmarks** for social proof (`<span>Acme Co</span>`). Use Simple Icons (`https://cdn.simpleinfo.org/{slug}/ffffff`) or devicon.
- **Logo wall = logos ONLY** — no industry/category labels below.

### 7.3 Image Loading
- `<img>` needs explicit `width` + `height` (prevents CLS).
- Below-fold: `loading="lazy"`.
- Above-fold LCP: `fetchpriority="high"` + `next/image priority`.
- Modern formats (webp, avif); responsive `srcset`/`<picture>`.

### 7.4 Brand Imagery
- One decisive photo beats five mediocre ones.
- Hero imagery should commit to a mood; padding with more stock doesn't rescue indecision.
- **Alt text is part of the voice.**
- A restaurant/hotel/magazine/product landing page without imagery reads as incomplete, not restrained.

---

## 8. COPY — The Denylist

### 8.1 BANNED Words & Phrases (build fails on these)
- **Em dashes** (`—`) and `--` substitute — the #1 LLM stylistic crutch. **COMPLETELY banned** in headlines, eyebrows, labels, pills, buttons, captions, nav, body, quotes, attribution, alt text. Use regular hyphen `-` or restructure the sentence.
- `seamless`, `robust`, `delve`, `elevate`, `empower`, `underscore`, `pivotal`, `tapestry`, `data-driven`
- `load-bearing`, `highest-leverage`, `biggest unlock`, `reflex defaults`, `collapses into monoculture`
- `in today's`, `gone are the days`, `whether you're`, `let's dive in`, `in summary`, `in conclusion`, `moreover`, `furthermore`
- "Elevate", "Unleash", "Next-Gen", "Game-changer", "In the world of..."

### 8.2 Patterns the Validator Can't Catch (require human judgment)
- **Negation pivot:** "It's not just X, it's Y." — stronger AI tell than any vocabulary item. Use sparingly.
- **Triadic everything:** every list exactly three items. Vary count: use 2 or 4. Use 1.
- **The five-paragraph essay shape** on every page. Lead with the example. Skip the conclusion.
- **Uniform paragraph length.** Insert a 4-word sentence. Insert a one-line paragraph.
- **Synthetic balance:** pros and cons of equal length when one is clearly right.
- **Hollow confidence:** "Powerful" without numbers. Replace with concrete fact.
- **Hedging stacks:** "It might potentially be useful to consider..."
- **Interchangeable copy:** swap brand name for competitor. If nothing becomes false, the copy is generic.

### 8.3 The Bar
> "For every paragraph, point to the sentence that makes it specifically yours. If you can't, the paragraph is AI by default."

- Open with the reader's wrong belief, your strongest claim, or the example. No "in this guide".
- Take a position someone could disagree with.
- Name names. Use numbers. Real competitors, real customer names, real version numbers, real file paths, real benchmarks. "Cut 'lightweight'; write '54 KB'."
- Verbs lead. Nouns follow. Active voice. Cut nominalizations.
- Vary sentence length on purpose. Long, long, short. "Smooth uniform rhythm is the deepest AI tell."

### 8.4 Button Labels
- **NEVER** "OK", "Submit", "Yes/No". Use specific verb + object: "Save changes", "Create account", "Delete message", "Keep editing" (not "Cancel"), "Download PDF" (not "Click here").
- For destructive: "Delete" not "Remove" (delete is permanent); "Delete 5 items" not "Delete selected" (show count).
- CTA text MUST fit one line at desktop. 3 words max for primary CTAs, ideally 1-2.
- **No duplicate CTA intent:** "Get in touch" + "Contact us" + "Let's talk" = all "contact" → pick ONE label.

### 8.5 Microcopy
- **No fake-precise numbers** (`99.99%`, `50%`, `1234567`). Use organic messy data (`47.2%`, `+1 (312) 847-1928`).
- **No "Jane Doe" Effect:** no generic names, no generic avatars, no startup-slop brand names ("Acme", "Nexus", "SmartFlow", "Cloudly"), no filler verbs.
- Quotes: max 3 lines of body. Attribution: name + role + (optionally) company. Never name only. Use real typographic quotes (`"` `"`).
- Loading states: be specific ("Saving your draft..." not "Loading..."). For long waits, set expectations.

### 8.6 Forbidden Decorative Microcopy (taste-skill §9)
- Version labels in hero (`V0.6`, `BETA`, `INVITE-ONLY PREVIEW`)
- Section-number eyebrows (`00 / INDEX`, `001 · Capabilities`, `06 · how it works`)
- `01 / 4` pagination on images/bento tiles
- Pills/labels overlaid on images
- Photo-credit captions as decoration (`Field study no. 12 · Ines Caetano`)
- Version footers on marketing pages (`v1.4.2`, `Build 0048`)
- Locale/city-name/time/weather strips ("Lisbon, working with founders")
- "Quietly in use at" / "Quietly trusted by" social-proof headers
- "From the field" / "Field notes" / "Currently on the bench" poetic labels
- Scroll cues (`Scroll`, `↓ scroll`, mouse-wheel icons)
- Decoration text strip at hero bottom (`BRAND. MOTION. SPATIAL.`)

---

## 9. THE REDESIGN WORKFLOW

### 9.1 Detect the Mode (taste-skill §11)
- **Greenfield** — no existing site or full overhaul approved → dial baseline 8/6/4.
- **Redesign-Preserve** — modernize without breaking brand → audit first, extract brand tokens, evolve gradually.
- **Redesign-Overhaul** — new visual language on existing content → treat as greenfield for visuals, preserve content + IA.

If ambiguous, ask once: *"Should this redesign preserve the existing brand, or are we starting visually from scratch?"*

### 9.2 Audit Before Touching (redesign-skill)
Document current state:
- Brand tokens (colors, type stack, logo, radii)
- Information architecture (page tree, nav, conversion paths)
- Content blocks (what exists, what's doing work, what's filler)
- Patterns to preserve vs. retire
- Dial reading of existing site (infer current 3 dials — that's your starting point)
- **SEO baseline** (ranking pages, meta titles, structured data, OG cards) — "SEO migration is the #1 redesign risk"

### 9.3 What NEVER Changes Silently
- URL structure / route slugs
- Primary nav labels
- Form field names or order (breaks analytics + autofill)
- Brand logo or wordmark
- Legal / consent / cookie copy

### 9.4 Modernization Levers in Priority Order (stop when brief is satisfied)
1. **Typography refresh** — biggest visual lift per unit of risk
2. **Spacing & rhythm** — increase section padding, fix vertical rhythm
3. **Color recalibration** — desaturate, unify neutrals, keep brand accent
4. **Motion layer** — add MOTION_INTENSITY-appropriate micro-interactions
5. **Hero & key-section recomposition** — restructure top-of-funnel
6. **Full block replacement** — only when existing block is unsalvageable

### 9.5 Fix Priority for Maximum Visual Impact, Minimum Risk
1. Font swap
2. Color palette cleanup
3. Hover and active states
4. Layout and spacing
5. Replace generic components
6. Add loading/empty/error states
7. Polish typography scale and spacing

---

## 10. THE PRE-FLIGHT CHECKLIST (run before declaring done)

### Structural
- [ ] Macrostructure picked from 21 options and stated in code comment?
- [ ] Hero fits initial viewport (headline ≤ 2 lines, subtext ≤ 20 words, CTA visible)?
- [ ] Hero top padding ≤ `pt-24`?
- [ ] Hero stack ≤ 4 text elements?
- [ ] NO 3-column equal feature cards?
- [ ] NO split-header ("left big headline + right small explainer")?
- [ ] Zigzag alternation ≤ 2 consecutive?
- [ ] Bento has exact cell count (N items → N cells, no empty cells)?
- [ ] ≥ 4 different layout families across 8 sections?
- [ ] Long lists (>5 items) use the right component, not default `<ul>` + `divide-y`?

### Theme & Shape
- [ ] Page Theme Lock — ONE theme for whole page, no mid-page flips?
- [ ] Color Consistency Lock — ONE accent used identically everywhere?
- [ ] Shape Consistency Lock — ONE corner-radius scale?

### Color
- [ ] NO default Tailwind indigo/violet/purple?
- [ ] NO purple→blue gradient hero?
- [ ] NO pure `#000000` or `#ffffff`?
- [ ] NO gray text on colored backgrounds?
- [ ] NO gradient text?
- [ ] ≤ 2 visible accent uses per screen?
- [ ] All contrast floors met (4.5:1 body, 3:1 large/UI)?
- [ ] NO cream/sand/beige warm-neutral bg (unless explicitly justified)?

### Typography
- [ ] NO fonts from reflex-reject list (Inter, Fraunces, Newsreader, etc.)?
- [ ] Font picked via the 4-step selection procedure?
- [ ] Display heading ≤ 6rem, letter-spacing ≥ -0.04em?
- [ ] H1 ≤ 2-3 lines?
- [ ] ALL CAPS has ≥ 0.06em tracking?
- [ ] Display ≥ 32px has negative tracking?
- [ ] Body ≤ 65ch line length, line-height 1.5-1.6?
- [ ] Italic descenders have `leading-[1.1]` + `pb-1`?
- [ ] Emphasis uses italic/bold of SAME font, not mixed family?
- [ ] Fonts loaded via `next/font` or self-hosted (no Google Fonts `<link>`)?

### Motion
- [ ] Every animation passes the 4-question framework (frequency, purpose, easing, duration)?
- [ ] NO `ease-in` on UI?
- [ ] Custom easing tokens defined and used?
- [ ] NO `scale(0)` entrances?
- [ ] Popovers scale from trigger (Radix var), modals stay centered?
- [ ] Buttons have `scale(0.97)` on `:active`?
- [ ] UI animations ≤ 300ms?
- [ ] Only `transform` and `opacity` animated (never layout props)?
- [ ] NO `transition: all`?
- [ ] Framer Motion uses full transform strings (not `x`/`y`/`scale` shorthand under load)?
- [ ] NO `window.addEventListener('scroll')`?
- [ ] NO `useState` for continuous values (mouse/scroll/pointer)?
- [ ] Marquee max-one-per-page?
- [ ] `prefers-reduced-motion` respected (gentler, not zero)?
- [ ] Hover gated behind `@media (hover: hover) and (pointer: fine)`?
- [ ] Motion motivated (can justify each in one sentence)?

### Components & Interaction
- [ ] All 8 states implemented (default, hover, focus, active, disabled, loading, error, success)?
- [ ] `:focus-visible` used (not `outline: none` without replacement)?
- [ ] Focus rings DON'T animate in?
- [ ] Forms: label above input, validate on blur, preserve input on error?
- [ ] Skeleton screens > spinners?
- [ ] Undo > confirmation dialogs?
- [ ] NO nested cards?
- [ ] shadcn/ui customized (not default state)?
- [ ] Icons from Phosphor/HugeIcons/Radix/Tabler (NOT hand-rolled SVG, NOT emoji)?
- [ ] NO `<img>` animated on hover?
- [ ] Touch targets ≥ 24×24 CSS px (44×44 AAA/iOS)?

### Copy
- [ ] ZERO em-dashes (`—`) anywhere visible?
- [ ] ZERO banned words (seamless, robust, delve, elevate, empower, etc.)?
- [ ] Every paragraph has a sentence that's specifically "yours"?
- [ ] Button labels are specific verb + object (not "OK"/"Submit"/"Yes")?
- [ ] NO fake-precise numbers (99.99%, 50%)?
- [ ] NO generic names (Jane Doe) or startup-slop brands (Acme, Nexus)?
- [ ] NO decorative microcopy (version labels, section numbers, scroll cues, "Quietly in use at")?
- [ ] Quotes ≤ 3 lines?
- [ ] NO duplicate CTA intent?

### Assets
- [ ] Real images used (gen-tool → picsum-seed → labeled placeholder)?
- [ ] NO div-based fake screenshots?
- [ ] Logo wall = logos only (Simple Icons / devicon), no category labels?
- [ ] `<img>` has explicit width + height?
- [ ] LCP image has `fetchpriority="high"` / `next/image priority`?
- [ ] Below-fold images `loading="lazy"`?

### Accessibility
- [ ] `<html lang="...">` set?
- [ ] Semantic landmarks (`header`/`nav`/`main`/`aside`/`footer`)?
- [ ] One `<h1>` per page, no skipped levels?
- [ ] Skip link present?
- [ ] ARIA used sparingly (native HTML first)?
- [ ] `color-scheme: dark` on `<html>` for dark themes?
- [ ] `<meta name="theme-color">` matches page bg?

### Performance
- [ ] Core Web Vitals plausible (LCP < 2.5s, INP < 200ms, CLS < 0.1)?
- [ ] NO layout reads in render (`getBoundingClientRect`, `offsetHeight`)?
- [ ] Lists >50 items virtualized?
- [ ] Z-index scale semantic (not arbitrary `z-9999`)?
- [ ] `useEffect` animations have strict cleanup?

### The Final Bar
- [ ] First-order slop test: could someone guess theme+palette from category alone? (Must be NO)
- [ ] Second-order slop test: could someone guess aesthetic family from category+anti-references? (Must be NO)
- [ ] **"If someone could look at this interface and say 'AI made that' without doubt, it's failed."** — Can you honestly say they couldn't?

> "If a single checkbox cannot be honestly ticked, the page is not done. Fix it before delivering."

---

## 11. STACK-SPECIFIC IMPLEMENTATION (React / Next.js 16 / Tailwind v4 / shadcn)

### Setup
- **Framework:** Next.js 16 App Router, Server Components default. Wrap providers in `"use client"`.
- **Styling:** Tailwind v4 via `@tailwindcss/postcss` (NOT v3 `tailwindcss` plugin in postcss config).
- **Animation:** `motion/react` (Motion, formerly Framer Motion). `framer-motion` package works as legacy alias.
- **Fonts:** `next/font` or self-hosted `@font-face` + `font-display: swap`.
- **Icons:** `@phosphor-icons/react` > `hugeicons-react` > `@radix-ui/react-icons` > `@tabler/icons-react`.
- **State:** local `useState`/`useReducer` for isolated UI; Zustand/Jotai/Context for deep prop-drilling only.

### Interactivity Isolation
Any component using Motion, scroll listeners, or pointer physics MUST be an isolated leaf with `'use client'` at the top. Server Components render static layouts only.

### Responsive Defaults
- Breakpoints: `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`.
- Container: `max-w-[1400px] mx-auto` or `max-w-7xl`.
- Viewport: `min-h-[100dvh]`, NEVER `h-screen`.
- Grid over Flex-Math: `grid grid-cols-1 md:grid-cols-3 gap-6`, NEVER `w-[calc(33%-1rem)]`.
- Mobile collapse explicit per section — declare `< 768px` fallback in the same component.

### Canonical Patterns
**Scroll-Reveal Stagger (Motion-only, use for simple reveals):**
```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export function RevealStagger({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <ul className="grid gap-6">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          {item}
        </motion.li>
      ))}
    </ul>
  );
}
```

**Origin-aware Popover (shadcn/Radix):**
```tsx
<PopoverContent className="origin-[var(--radix-popover-content-transform-origin)]" />
```

**Button press feedback:**
```tsx
<Button className="active:scale-[0.97] transition-transform duration-150 ease-out">
```

**Easing tokens in globals.css:**
```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
}
```

**Reduced motion baseline:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 12. AVAILABLE DESIGN-SYSTEM SHORTCUTS

When a brief reads as a real existing brand, copy the drop-in tokens from `/home/z/my-project/skills/open-design/design-systems/<brand>/`:
- `tailwind-v4.css` — pre-compiled Tailwind v4 `@theme` block
- `tokens.css` — CSS custom properties
- `components.html` — component fixture patterns
- `system/kit.html` + `kit.dark.html` — full live component kit

**Notable systems available:** stripe, linear-app, vercel, apple, notion, resend, supabase, sentry, clickhouse, posthog, airbnb, nike, spotify, tesla, ferrari, + 140 more aesthetic categories (minimal, brutalism, editorial, glassmorphism, neobrutalism, etc.)

**When to use:** Pick ONE reference system that matches the brief. Read its `DESIGN.md` in full. Copy tokens into the project `@theme` block. Customize — never ship verbatim.

---

## 13. QUICK HEURISTICS (memorize these)

1. **Read the brief, declare a one-line Design Read, set three dials.** Don't default to Inter + slate-900 + AI-purple.
2. **One accent, one radius scale, one theme, one design system, one icon family per project.** Lock each, audit before shipping.
3. **Zero em-dashes. Real images. No fake screenshots. Motion must be motivated. Run the Pre-Flight Check.**
4. **Structural variety beats visual variety.** Pick a macrostructure; don't ship hero→3-features→CTA→footer.
5. **"If someone could say 'AI made that' without doubt, it's failed."**
6. **When unsure whether motion feels right, the strongest move is often to delete it.**
7. **Polish is the last step, not the first. Don't polish work that's not functionally complete.**
8. **Name a real reference before picking colors. Unnamed ambition becomes beige.**
