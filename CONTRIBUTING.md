# Contributing to kon-iro 紺色

Thanks for your interest! kon-iro is a small, opinionated 和色 theme. The bar for
changes is *coherence with the palette*, not breadth.

## Principles

- **Tokens are the source of truth.** Edit `tokens/*.json`, then run
  `npm run build` to regenerate `dist/kon-iro.css` and `dist/kon-iro.ts`. Never
  hand-edit those generated files. (`dist/tailwind-preset.cjs` is hand-maintained
  — it only references CSS var *names*, not values.)
- **Two tiers.** Raw 和色 live in `palette.json` with their kanji/romaji. Apps
  consume the **semantic** tier (`bg`, `surface`, `text`, `accent`, …). Add new
  meaning at the semantic tier; add new color at the palette tier.
- **Every color earns its place.** New palette entries should be real 和色 with a
  name and source — link a reference (e.g. a 伝統色 list) in the PR.

## Accessibility (please read)

Color contrast is a correctness concern here, not a nice-to-have:

- Any **text** token over its **ground** must meet **WCAG AA** (4.5:1 for body,
  3:1 for large/▥ ≥24px). Accents used as text (`accent`, `info`, `success`,
  `warm`, `link`) must pass on **both** `surface` and `surface-raised`.
- Don't rely on color alone to convey meaning (pair with weight, icon, or label).
- Keep the focus ring visible: `--kon-focus` must contrast with the ground.

Run the (todo) audit before submitting palette changes; until it lands, paste a
contrast table (foreground × background → ratio) in the PR.

## Dev

```sh
npm run build      # regenerate dist/ from tokens/ (no install needed — Node built-ins only)
open docs/index.html
```

## PRs

- One concern per PR. Describe the 和色 / role you changed and why.
- Include before/after swatches or a screenshot of `docs/index.html`.
- Semantic-version intent: palette re-tunes = minor, semantic-token renames =
  major (they break consumers).
