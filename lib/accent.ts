/**
 * The site's single accent color, tunable by visitors (hero AccentTuner).
 *
 * The chosen color lives in localStorage and is applied as inline CSS
 * variables on <html>, so it survives navigation and reloads.
 * ACCENT_BOOT_SCRIPT applies it before first
 * paint (see app/layout.tsx); this module keeps it in sync afterwards.
 */

export type Accent = { h: number; l: number; c: number };

/** Matches --color-accent in app/globals.css. */
export const SITE_ACCENT: Accent = { h: 258, l: 0.58, c: 0.19 };

export const PRESETS = [
  { id: "cobalt", ...SITE_ACCENT },
  { id: "vermilion", h: 32, l: 0.58, c: 0.2 },
  { id: "magenta", h: 350, l: 0.56, c: 0.21 },
  { id: "violet", h: 298, l: 0.55, c: 0.2 },
  { id: "emerald", h: 160, l: 0.55, c: 0.14 },
  { id: "graphite", h: 258, l: 0.5, c: 0 },
] as const;

export type PresetId = (typeof PRESETS)[number]["id"];

const STORAGE_KEY = "accent";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const sameAccent = (a: Accent, b: Accent) =>
  Math.round(a.h) === Math.round(b.h) && r2(a.l) === r2(b.l) && r2(a.c) === r2(b.c);

/** The darker text variant tracks the accent, like the original pair in globals.css. */
export const inkOf = (a: Accent): Accent => ({
  h: a.h + 4,
  l: Math.max(0.2, a.l - 0.1),
  c: Math.max(0, a.c - 0.01),
});

export const cssOf = (a: Accent) => `oklch(${r2(a.l)} ${r2(a.c)} ${Math.round(a.h)})`;

export const encode = (a: Accent) => `${Math.round(a.h)}-${r2(a.l)}-${r2(a.c)}`;

export function decode(v: string | null): Accent | null {
  if (!v) return null;
  const [h, l, c] = v.split("-").map(Number);
  if ([h, l, c].some((n) => !Number.isFinite(n))) return null;
  return { h: ((h % 360) + 360) % 360, l: Math.min(0.85, Math.max(0.3, l)), c: Math.min(0.3, Math.max(0, c)) };
}

/** OKLCH → linear sRGB (clamped to gamut), via OKLab. */
function toLinearRgb({ l, c, h }: Accent) {
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  return [
    clamp(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
    clamp(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
    clamp(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_),
  ];
}

/** WCAG 2 contrast ratio against white. */
export function contrastOnWhite(a: Accent) {
  const [r, g, b] = toLinearRgb(a);
  return 1.05 / (0.2126 * r + 0.7152 * g + 0.0722 * b + 0.05);
}

function apply(a: Accent) {
  const s = document.documentElement.style;
  if (sameAccent(a, SITE_ACCENT)) {
    s.removeProperty("--color-accent");
    s.removeProperty("--color-accent-ink");
  } else {
    s.setProperty("--color-accent", cssOf(a));
    s.setProperty("--color-accent-ink", cssOf(inkOf(a)));
  }
}

// --- tiny external store (for useSyncExternalStore) ---

let current: Accent | null = null;
const listeners = new Set<() => void>();

export function getAccent(): Accent {
  if (!current) {
    try {
      current = decode(localStorage.getItem(STORAGE_KEY)) ?? SITE_ACCENT;
    } catch {
      current = SITE_ACCENT;
    }
  }
  return current;
}

export const getServerAccent = () => SITE_ACCENT;

// Keep other open tabs in step when the accent changes in one of them.
function onStorage(e: StorageEvent) {
  if (e.key !== STORAGE_KEY) return;
  current = decode(e.newValue) ?? SITE_ACCENT;
  apply(current);
  listeners.forEach((l) => l());
}

export function subscribeAccent(cb: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function setAccent(a: Accent) {
  current = a;
  apply(a);
  try {
    if (sameAccent(a, SITE_ACCENT)) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, encode(a));
  } catch {
    /* storage unavailable: the color still applies for this page view */
  }
  listeners.forEach((l) => l());
}

/**
 * Inlined into <head> so a stored accent is on <html> before first
 * paint (no flash of the default color). Mirrors decode/inkOf/apply above.
 */
export const ACCENT_BOOT_SCRIPT = `(function(){try{
var v=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(!v)return;
var p=v.split("-").map(Number);if(p.length!==3||p.some(function(n){return !isFinite(n)}))return;
var h=((p[0]%360)+360)%360,l=Math.min(.85,Math.max(.3,p[1])),c=Math.min(.3,Math.max(0,p[2]));
var s=document.documentElement.style;
s.setProperty("--color-accent","oklch("+l+" "+c+" "+h+")");
s.setProperty("--color-accent-ink","oklch("+Math.max(.2,l-.1)+" "+Math.max(0,c-.01)+" "+(h+4)+")");
}catch(e){}})();`;
