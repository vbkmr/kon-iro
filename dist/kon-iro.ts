/**
 * kon-iro 紺色 — design tokens as a typed object.
 * GENERATED from /tokens by scripts/build.mjs — do not edit by hand.
 * Use for JS-in-CSS, React Native, charts, or anywhere CSS vars don't reach.
 */

/** Raw 和色 palette — name → { hex, kanji, romaji }. */
export const palette = {
  konDeep: { hex: "#0b1430", kanji: "鉄紺", romaji: "tetsukon" },
  kon: { hex: "#11213f", kanji: "紺", romaji: "kon" },
  konPanel: { hex: "#16274d", kanji: "紺青", romaji: "konjō" },
  konLine: { hex: "#2b3e68", kanji: "藍墨", romaji: "aizumi" },
  neri: { hex: "#f0e8d6", kanji: "練色", romaji: "neri-iro" },
  ginnezu: { hex: "#a9adb0", kanji: "銀鼠", romaji: "ginnezu" },
  sango: { hex: "#f5b1aa", kanji: "珊瑚色", romaji: "sango-iro" },
  yamabuki: { hex: "#f8b500", kanji: "山吹色", romaji: "yamabuki-iro" },
  asagi: { hex: "#5bb7c0", kanji: "浅葱色", romaji: "asagi-iro" },
  moegi: { hex: "#aacf53", kanji: "萌黄", romaji: "moegi" },
  hitan: { hex: "#f0937a", kanji: "退紅", romaji: "taikō" },
  washi: { hex: "#efe7d3", kanji: "生成り", romaji: "kinari" },
  washiRaised: { hex: "#f7f1e1", kanji: "白練", romaji: "shironeri" },
  washiLine: { hex: "#dcd0b4", kanji: "砂色", romaji: "suna-iro" },
  kobicha: { hex: "#6a5d21", kanji: "媚茶", romaji: "kobicha" },
  nando: { hex: "#1f6f78", kanji: "納戸色", romaji: "nando-iro" },
  chitose: { hex: "#316745", kanji: "千歳緑", romaji: "chitose-midori" },
  suo: { hex: "#9e3d3f", kanji: "蘇芳", romaji: "suō" },
  nibi: { hex: "#5e5d56", kanji: "鈍色", romaji: "nibi-iro" },
} as const;

/** Semantic color tokens per theme. */
export const color = {
  kon: {
    bg: "#0b1430",
    surface: "#11213f",
    surfaceRaised: "#16274d",
    line: "#2b3e68",
    text: "#f0e8d6",
    textMuted: "#a9adb0",
    link: "#f5b1aa",
    accent: "#f8b500",
    info: "#5bb7c0",
    success: "#aacf53",
    warm: "#f0937a",
    focus: "#f8b500",
  },
  washi: {
    bg: "#efe7d3",
    surface: "#f7f1e1",
    surfaceRaised: "#fdfaf1",
    line: "#dcd0b4",
    text: "#0b1430",
    textMuted: "#5e5d56",
    link: "#9e3d3f",
    accent: "#6a5d21",
    info: "#1f6f78",
    success: "#316745",
    warm: "#9e3d3f",
    focus: "#6a5d21",
  },
} as const;

export const font = {
  jp: '"Shippori Mincho", serif',
  sans: '"Zen Kaku Gothic New", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export const radius = { sm: "10px", md: "14px", lg: "26px" } as const;

export const motion = {
  rise: "550ms",
  fade: "400ms",
  ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
} as const;

export type ThemeName = keyof typeof color;
export default { palette, color, font, radius, motion };
