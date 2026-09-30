"use client";

import { useSyncExternalStore, type CSSProperties } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  PRESETS,
  SITE_ACCENT,
  contrastOnWhite,
  cssOf,
  getAccent,
  getServerAccent,
  inkOf,
  sameAccent,
  setAccent,
  subscribeAccent,
  type Accent,
} from "@/lib/accent";

function Badge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-xs ${
        ok ? "text-black" : "text-gray-500 line-through"
      }`}
    >
      <span aria-hidden>{ok ? "✓" : "✕"}</span>
      {label}
    </span>
  );
}

/** Range input whose track previews the color along that axis. */
function ColorSlider({
  label,
  value,
  display,
  min,
  max,
  step,
  track,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  track: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-xs text-gray-600">
        {label}
        <span className="font-mono tabular-nums text-accent-ink">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="color-range mt-2"
        style={{ "--track": track } as CSSProperties}
      />
    </label>
  );
}

const stops = (n: number, f: (t: number) => string) =>
  `linear-gradient(to right, ${Array.from({ length: n + 1 }, (_, i) => f(i / n)).join(", ")})`;

/**
 * Hero side-card: lets visitors recolor the site's single accent (presets or
 * hue / lightness / chroma), checks it against WCAG and remembers it across
 * pages. State lives in lib/accent.ts.
 */
export default function AccentTuner() {
  const { t } = useLanguage();
  const c = t.hero.color;
  const accent = useSyncExternalStore(subscribeAccent, getAccent, getServerAccent);

  const update = (patch: Partial<Accent>) => setAccent({ ...accent, ...patch });

  const textRatio = contrastOnWhite(inkOf(accent));
  const uiRatio = contrastOnWhite(accent);
  const isSite = sameAccent(accent, SITE_ACCENT);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 p-5 backdrop-blur-sm">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm text-black">{c.title}</p>
        {!isSite && (
          <button
            type="button"
            onClick={() => setAccent(SITE_ACCENT)}
            className="text-xs font-mono text-gray-500 hover:text-black transition-colors"
          >
            {c.reset}
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-[5.5rem_minmax(0,1fr)] gap-5 items-center">
        <div className="aspect-square rounded-xl bg-accent" />
        <div>
          <p className="text-xs text-gray-600">{c.contrast}</p>
          <p className="mt-1 text-3xl font-light tracking-tight tabular-nums text-black">
            {textRatio.toFixed(2)}
            <span className="text-base text-gray-500"> : 1</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5" aria-live="polite">
            <Badge ok={textRatio >= 4.5} label={`${c.normal} ≥ 4.5`} />
            <Badge ok={uiRatio >= 3} label={`${c.large} ${uiRatio.toFixed(1)} ≥ 3`} />
          </div>
        </div>
      </div>

      {/* Presets */}
      <div role="group" aria-label={c.presetsLabel} className="mt-5 flex items-center gap-2">
        {PRESETS.map((p) => {
          const active = sameAccent(accent, p);
          return (
            <button
              key={p.id}
              type="button"
              title={c.presets[p.id]}
              aria-label={c.presets[p.id]}
              aria-pressed={active}
              onClick={() => setAccent({ h: p.h, l: p.l, c: p.c })}
              className={`h-7 w-7 rounded-full ring-offset-2 ring-offset-white transition-shadow ${
                active ? "ring-2 ring-black" : "hover:ring-1 hover:ring-gray-300"
              }`}
              style={{ backgroundColor: cssOf(p) }}
            />
          );
        })}
      </div>

      <div className="mt-5 space-y-4">
        <ColorSlider
          label={c.hue}
          value={accent.h}
          display={`${Math.round(accent.h)}°`}
          min={0}
          max={360}
          step={1}
          track={stops(12, (x) => cssOf({ ...accent, h: x * 360 }))}
          onChange={(h) => update({ h })}
        />
        <ColorSlider
          label={c.lightness}
          value={accent.l}
          display={accent.l.toFixed(2)}
          min={0.3}
          max={0.85}
          step={0.01}
          track={stops(4, (x) => cssOf({ ...accent, l: 0.3 + x * 0.55 }))}
          onChange={(l) => update({ l })}
        />
        <ColorSlider
          label={c.chroma}
          value={accent.c}
          display={accent.c.toFixed(2)}
          min={0}
          max={0.3}
          step={0.01}
          track={stops(4, (x) => cssOf({ ...accent, c: x * 0.3 }))}
          onChange={(v) => update({ c: v })}
        />
      </div>

      <p className="mt-4 font-mono text-xs text-gray-600 break-all">
        --color-accent: <span className="text-accent-ink">{cssOf(accent)}</span>;
      </p>
      <p className="mt-4 text-sm leading-relaxed text-gray-600 text-pretty">{c.intro}</p>
    </div>
  );
}
