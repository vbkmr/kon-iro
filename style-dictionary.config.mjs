/**
 * Style Dictionary config for kon-iro.
 *
 * Source of truth: /tokens (W3C DTCG JSON).
 * `npm run build` regenerates outputs into /build for review/diffing against
 * the curated, hand-maintained files in /dist (which are what the npm package
 * publishes). Keeping /dist hand-authored means the package works with zero
 * build, while /tokens stays the canonical, multi-platform source.
 *
 * Each theme (kon = dark, washi = light) is built from base.json + palette.json
 * + the matching semantic file, so every theme is internally consistent.
 */
const themes = [
  { name: "kon", semantic: "tokens/semantic.dark.json" },
  { name: "washi", semantic: "tokens/semantic.light.json" },
];

export default {
  // dynamic per-theme builds
  log: { verbosity: "default" },
  source: [], // set per-theme below via platforms
  platforms: {},
  // NOTE: this is a starting skeleton. To wire the per-theme builds, iterate
  // `themes` in a small build script (build.mjs) calling `new StyleDictionary({
  //   source: ["tokens/base.json", "tokens/palette.json", theme.semantic],
  //   platforms: {
  //     css: { transformGroup: "css", buildPath: `build/${theme.name}/`,
  //            files: [{ destination: "vars.css", format: "css/variables",
  //                      options: { selector: theme.name === "kon" ? ":root" : `[data-theme="washi"]` } }] },
  //     ts:  { transformGroup: "js", buildPath: `build/${theme.name}/`,
  //            files: [{ destination: "tokens.ts", format: "javascript/es6" }] }
  //   }
  // }).buildAllPlatforms()` for each theme.
  themes,
};
