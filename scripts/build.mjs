/**
 * kon-iro build — generate dist/ from the token source of truth in /tokens.
 *
 * Dependency-free (Node built-ins only): for a palette this size, a focused
 * generator is simpler and more auditable than a full token pipeline, and the
 * W3C DTCG token files stay portable to Style Dictionary / native targets later.
 *
 * Outputs:
 *   dist/kon-iro.css  — CSS custom properties, dark 紺 (default) + light 和紙
 *   dist/kon-iro.ts   — typed token object
 *
 * Run: `npm run build`.  Do not hand-edit the generated files; edit /tokens.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));

const palette = read("tokens/palette.json").color.palette;
const dark = read("tokens/semantic.dark.json").color;
const light = read("tokens/semantic.light.json").color;
const base = read("tokens/base.json");

// ── helpers ────────────────────────────────────────────────────────────
const ALIAS = /^\{color\.palette\.([\w-]+)\}$/;
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const pad = (s, n) => (s + ":").padEnd(n);

/** semantic $value → CSS expression: palette alias becomes var(), literal stays. */
const cssVal = (v) => {
  const m = ALIAS.exec(v);
  return m ? `var(--kon-wa-${m[1]})` : v;
};
/** semantic $value → resolved hex (for the TS object). */
const hexVal = (v) => {
  const m = ALIAS.exec(v);
  if (!m) return v;
  if (!palette[m[1]]) throw new Error(`unresolved alias: ${v}`);
  return palette[m[1]].$value;
};
const fontFamily = (arr) => arr.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(", ");
const cubic = (arr) => `cubic-bezier(${arr.join(", ")})`;

// ── base (non-color) vars, in a fixed, ergonomic naming layout ──────────
const baseVars = () => {
  const f = base.font, s = base.size.fluid, sp = base.space, r = base.radius, mo = base.motion;
  const out = { type: [], box: [], motion: [] };
  out.type.push(["--kon-font-jp", fontFamily(f.family.jp.$value)]);
  out.type.push(["--kon-font-sans", fontFamily(f.family.sans.$value)]);
  out.type.push(["--kon-font-mono", fontFamily(f.family.mono.$value)]);
  for (const k of ["regular", "medium", "semibold", "bold"]) out.type.push([`--kon-weight-${k}`, String(f.weight[k].$value)]);
  for (const k of ["display", "h2", "body", "label", "meta"]) out.type.push([`--kon-size-${k}`, s[k].$value]);
  for (const k of Object.keys(sp)) out.box.push([`--kon-space-${k}`, sp[k].$value]);
  for (const k of ["sm", "md", "lg"]) out.box.push([`--kon-radius-${k}`, r[k].$value]);
  out.box.push(["--kon-measure-reading", base.measure.reading.$value]);
  out.motion.push(["--kon-motion-rise", mo.rise.$value]);
  out.motion.push(["--kon-motion-fade", mo.fade.$value]);
  out.motion.push(["--kon-motion-ease", cubic(mo.ease.$value)]);
  return out;
};

// ── CSS ─────────────────────────────────────────────────────────────────
const line = (k, v, ind = "  ") => `${ind}${pad(k, 22)} ${v};`;
const semanticBlock = (set, ind) =>
  Object.entries(set)
    .map(([k, t]) => line(`--kon-${k}`, cssVal(t.$value), ind))
    .join("\n");

const buildCss = () => {
  const b = baseVars();
  const paletteLines = Object.entries(palette)
    .map(([k, t]) => {
      const x = t.$extensions?.["kon-iro"] ?? {};
      return `${line(`--kon-wa-${k}`, t.$value)} /* ${x.kanji ?? ""} ${x.romaji ?? ""} */`;
    })
    .join("\n");
  const grp = (rows, ind = "  ") => rows.map(([k, v]) => line(k, v, ind)).join("\n");

  return `/*!
 * kon-iro 紺色 — a Japanese-traditional (和色) design theme.
 * Dark 紺 (indigo) by default; light 和紙 (washi) via [data-theme="washi"]
 * or the OS preference. Pure CSS custom properties — no build, no framework.
 *
 * GENERATED from /tokens by scripts/build.mjs — do not edit by hand.
 * https://github.com/vbkmr/kon-iro  ·  MIT
 */

:root {
  /* ── 和色 palette (raw escape-hatch values) ───────────────── */
${paletteLines}

  /* ── type ─────────────────────────────────────────────────── */
${grp(b.type)}

  /* ── space / radius / measure ─────────────────────────────── */
${grp(b.box)}

  /* ── motion ───────────────────────────────────────────────── */
${grp(b.motion)}

  /* ── semantic tokens · DARK 紺 (default) ──────────────────── */
${semanticBlock(dark, "  ")}
  color-scheme: dark;
}

/* ── semantic tokens · LIGHT 和紙 (washi) ───────────────────── */
[data-theme="washi"] {
${semanticBlock(light, "  ")}
  color-scheme: light;
}

/* follow the OS when no explicit theme is set */
@media (prefers-color-scheme: light) {
  :root:not([data-theme="kon"]):not([data-theme="washi"]) {
${semanticBlock(light, "    ")}
    color-scheme: light;
  }
}
`;
};

// ── TS ────────────────────────────────────────────────────────────────
const tsObj = (set) =>
  Object.entries(set)
    .map(([k, t]) => `    ${camel(k)}: "${hexVal(t.$value)}",`)
    .join("\n");

const buildTs = () => {
  const f = base.font, r = base.radius, mo = base.motion;
  const paletteEntries = Object.entries(palette)
    .map(([k, t]) => {
      const x = t.$extensions?.["kon-iro"] ?? {};
      return `  ${camel(k)}: { hex: "${t.$value}", kanji: "${x.kanji ?? ""}", romaji: "${x.romaji ?? ""}" },`;
    })
    .join("\n");

  return `/**
 * kon-iro 紺色 — design tokens as a typed object.
 * GENERATED from /tokens by scripts/build.mjs — do not edit by hand.
 * Use for JS-in-CSS, React Native, charts, or anywhere CSS vars don't reach.
 */

/** Raw 和色 palette — name → { hex, kanji, romaji }. */
export const palette = {
${paletteEntries}
} as const;

/** Semantic color tokens per theme. */
export const color = {
  kon: {
${tsObj(dark)}
  },
  washi: {
${tsObj(light)}
  },
} as const;

export const font = {
  jp: '${fontFamily(f.family.jp.$value)}',
  sans: '${fontFamily(f.family.sans.$value)}',
  mono: '${fontFamily(f.family.mono.$value)}',
} as const;

export const radius = { sm: "${r.sm.$value}", md: "${r.md.$value}", lg: "${r.lg.$value}" } as const;

export const motion = {
  rise: "${mo.rise.$value}",
  fade: "${mo.fade.$value}",
  ease: "${cubic(mo.ease.$value)}",
} as const;

export type ThemeName = keyof typeof color;
export default { palette, color, font, radius, motion };
`;
};

// ── write ───────────────────────────────────────────────────────────────
writeFileSync(join(root, "dist/kon-iro.css"), buildCss());
writeFileSync(join(root, "dist/kon-iro.ts"), buildTs());
console.log("built dist/kon-iro.css and dist/kon-iro.ts from /tokens");
