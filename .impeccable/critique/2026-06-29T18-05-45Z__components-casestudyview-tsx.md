---
target: case study pages
total_score: 34
p0_count: 0
p1_count: 1
timestamp: 2026-06-29T18-05-45Z
slug: components-casestudyview-tsx
---
## Critique: Case study pages (`components/CaseStudyView.tsx` + `content/caseStudies.ts`)

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Global scroll-progress bar present; external links give no "opens in new tab" cue |
| 2 | Match System / Real World | 4 | Plain language, natural Overview→Problem→Build→Outcome order |
| 3 | User Control and Freedom | 3 | "Back to work" + global nav; no breadcrumb, but back link suffices |
| 4 | Consistency and Standards | 4 | Matches site system exactly (grays, chips, accent, motion) |
| 5 | Error Prevention | 4 | No forms; bad slug → notFound() 404 |
| 6 | Recognition Rather Than Recall | 4 | Everything visible; grouped Frontend/Backend/Infra stack |
| 7 | Flexibility and Efficiency | 3 | Next-case-study + back links; no in-page section nav for a long read |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and restrained, but zero imagery + sparse first viewport + wide measure |
| 9 | Error Recovery | 3 | No in-page error states to recover from |
| 10 | Help and Documentation | 3 | Self-explanatory content; n/a for a portfolio surface |
| **Total** | | **34/40** | **Good** |

### Anti-Patterns Verdict
**LLM assessment**: Does not read as AI slop. No identical card grid, no hero-metric template, no per-section numbered markers, no gradient text, no glassmorphism. The eyebrow (`FULLSTACK APP · 2026`) appears once as page meta, not on every section — acceptable. The structure is a genuine case-study narrative, not scaffolding.
**Deterministic scan**: `detect.mjs --json components/CaseStudyView.tsx app/globals.css` → `[]` (zero findings).

### What's Working
1. **Narrative structure is the real win** — Overview → Problem → What I built → Tech & why → Hardest part → Outcome shows *reasoning*, not just a feature dump. The "Hardest part" (settle-up algorithm, OTP throttling) is exactly what differentiates a junior portfolio.
2. **Typographic contrast is excellent** — body `text-gray-600` (#4b5563) on white ≈ 7.5:1, well above AA; labels `text-gray-500` ≈ 4.8:1 pass. No washed-out gray-on-tint.
3. **The Journeo↔Outlay cross-link + "two backend philosophies" framing** is smart positioning and a strong peak-end engagement hook.
4. **Grouped tech stack** (Frontend/Backend/Infra) is scannable: recognition over recall.

### Priority Issues
- **[P1] No imagery in a case study about visual products.** A case study for two web apps shows zero of the product. This is the single biggest gap — text-only reads as incomplete in the brand register. Fix: one hero screenshot (or short looping clip) per study, ideally one mid-page visual of the standout feature (Journeo's settle-up, Outlay's dashboard). Captured from the live sites. Suggested command: /impeccable craft.
- **[P2] Body measure is too wide.** Prose uses `max-w-2xl` (≈42rem ≈ 80ch); the 65–75ch readability cap is exceeded. Fix: switch prose blocks to `max-w-prose` (~65ch) or `max-w-[68ch]`. Suggested command: /impeccable typeset.
- **[P2] Sparse first viewport / under-scaled hero.** On desktop the title sits mid-screen and the lower ~40% is empty before the divider; `display-sm` (clamp 2–4rem) is modest for a hero. Fix: pull the meta/first content up, or scale the title and tighten the top padding (`pt-36 md:pt-44`). Suggested command: /impeccable layout.
- **[P3] Uniform reveal reflex.** Every section gets the identical `reveal(i*0.04)` whileInView entrance. The tell is uniformity, not motion. Fix: let the header render static and vary entrances by content. Suggested command: /impeccable animate.
- **[P3] 10px labels.** Stack-group labels and eyebrow at `text-[10px]` are borderline for legibility. Fix: bump to 11–12px. Suggested command: /impeccable typeset.

### Persona Red Flags
**Jordan (First-Timer / recruiter skimming):** Lands on a wall of prose with nothing to *see*; a recruiter scanning in 10 seconds gets no visual proof the apps exist or look good. The "VIEW LIVE" button is the only path to seeing the product, and it leaves the site.
**Sam (Accessibility):** Strong here — semantic h1/h2, AA-passing contrast, focus-visible rings from globals, accent never the sole signal (bullets pair dot + text), reduced-motion honored via `useReveal`. No red flags.
**Casey (Distracted Mobile):** Layout stacks cleanly (`grid-cols-1`, `flex-wrap`); touch targets fine. The wide measure matters less on mobile. Long top padding pushes content down a bit.

### Minor Observations
- External links (Live/Source) don't signal they open in a new tab; a tiny ↗ is present which partially covers this.
- No in-page section nav; the approved mock showed Overview/Problem/… chips but the build omitted them. Optional for this length.
- `category · year` and role middots are consistent with the site — good.

### Questions to Consider
- What would this look like if the product *showed itself* in the first viewport instead of describing itself?
- Does a case study for a visual app earn the right to be text-only?
- Could the "Hardest part" get a small diagram (the settle-up netting) — the one place a visual would teach faster than prose?
