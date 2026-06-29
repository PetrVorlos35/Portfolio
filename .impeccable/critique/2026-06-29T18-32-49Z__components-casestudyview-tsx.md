---
target: case study pages
total_score: 35
p0_count: 0
p1_count: 0
timestamp: 2026-06-29T18-32-49Z
slug: components-casestudyview-tsx
---
## Critique (re-run): Case study pages (`components/CaseStudyView.tsx` + `content/caseStudies.ts`)

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Scroll-progress bar; external links lack an "opens new tab" cue |
| 2 | Match System / Real World | 4 | Plain language; natural narrative order |
| 3 | User Control and Freedom | 3 | Back link + global nav; no breadcrumb |
| 4 | Consistency and Standards | 4 | Matches site system; focus-visible parity now added |
| 5 | Error Prevention | 4 | No forms; bad slug → 404 |
| 6 | Recognition Rather Than Recall | 4 | Everything visible; grouped stack |
| 7 | Flexibility and Efficiency | 3 | No in-page section nav for a long read |
| 8 | Aesthetic and Minimalist Design | 4 | Hero imagery + scaled title + tight measure; held from 5 by hero reveal-gating + Journeo image pending |
| 9 | Error Recovery | 3 | No in-page error states |
| 10 | Help and Documentation | 3 | Self-explanatory; n/a for surface |
| **Total** | | **35/40** | **Good (one point off Excellent)** |

### Anti-Patterns Verdict
**LLM:** Still reads as human-made. No slop tells. The new hero image strengthens the brand register (a case study now shows the product).
**Deterministic scan:** `detect.mjs` on component + globals → `[]` (clean, second run).

### What changed since last critique (34 → 35)
- Hero title scaled to `.display`; first viewport no longer sparse (now anchored by the product image on Outlay).
- Body measure tightened to ~68ch; tagline `text-balance` at ~34ch; body `text-pretty`.
- Header rendered static, breaking the uniform reveal reflex.
- 10px labels → 11px.
- **Imagery (P1) landed for Outlay** — real product screenshot as hero + project thumbnail.
- Localized, meaningful `alt`; keyboard focus parity on the next-study link.

### Priority Issues (remaining)
- **[P2] Journeo case study still has no hero image.** Outlay shows the product; Journeo degrades to empty. Asymmetric and incomplete until `public/projects/journeo.png` is added (the "NOVÝ ZPŮSOB — JOURNEO" dashboard card on the live site). Suggested command: /impeccable craft.
- **[P3] Hero image is reveal-gated (initial opacity 0).** Caught it render blank at a partial scroll position before the `whileInView` trigger fired. For the single most important visual, gating it on a reveal risks a blank hero if JS/observer doesn't fire (headless, hidden tab). Fix: make the hero visible by default (drop the reveal, or animate from opacity 1). Suggested command: /impeccable animate.
- **[P3] No in-page section nav on a long read.** Optional; a sticky Overview/Problem/… rail would aid scanning. Suggested command: /impeccable layout.
- **[P3] External links don't announce "opens in new tab"** for screen readers (the ↗ glyph covers it visually). Suggested command: /impeccable clarify.

### What's Working
1. The narrative structure (Overview → Problem → Build → Tech & why → Hardest part → Outcome) remains the strength.
2. Typographic contrast and the new measure/`text-balance`/`text-pretty` give clean, even prose.
3. The Outlay hero image, undistorted via `h-auto`, makes the case study feel complete and proves the product.
4. Cross-link to the other study + "two backend philosophies" framing.

### Questions to Consider
- Should the hero image ever be allowed to start invisible, given it's the proof the whole page rests on?
- Once Journeo has its image, does the page want a second, in-context feature shot (the settle-up screen)?
