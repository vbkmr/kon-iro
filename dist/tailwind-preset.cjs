/**
 * kon-iro 紺色 — Tailwind preset.
 * Drop into any Tailwind project:
 *
 *   // tailwind.config.js
 *   module.exports = { presets: [require("kon-iro/tailwind")] }
 *
 * Then use utilities like  bg-kon-bg  text-kon-text  text-kon-accent  border-kon-line.
 * Colors resolve to the CSS variables in kon-iro.css, so theme switching
 * (dark 紺 ↔ light 和紙) happens automatically — import kon-iro.css once.
 */
const v = (name) => `var(--kon-${name})`;

module.exports = {
  theme: {
    extend: {
      colors: {
        kon: {
          bg: v("bg"),
          surface: v("surface"),
          "surface-raised": v("surface-raised"),
          line: v("line"),
          text: v("text"),
          "text-muted": v("text-muted"),
          link: v("link"),
          accent: v("accent"),
          info: v("info"),
          success: v("success"),
          warm: v("warm"),
          focus: v("focus"),
        },
      },
      fontFamily: {
        jp: ["Shippori Mincho", "serif"],
        sans: ["Zen Kaku Gothic New", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        kon: "14px",
        "kon-sm": "10px",
        "kon-lg": "26px",
      },
      maxWidth: {
        "kon-reading": "560px",
      },
    },
  },
};
