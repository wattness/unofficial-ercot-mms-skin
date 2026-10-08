# AGENTS.md

Instructions for coding agents working on this repository.

## What this is

An unofficial CSS recreation of the look of ERCOT's MMS screens: design tokens plus component styles, no
JavaScript in the package. It is not ERCOT software; keep it that way in code, docs and examples.

## Layout

- `src/tokens.css`: every colour, plus the shared fonts and metrics, as `--mms-*` custom properties.
  Sizes that belong to one component stay in its file.
- `src/base.css`, `src/components/*.css`: one file per component. `src/index.css` imports them in order.
- `scripts/build.mjs`: bundles into `dist/` and refreshes `skills/building-mms-screens/assets/`.
- `scripts/contrast.mjs`: WCAG contrast for the text/background pairs the components produce, including
  grid-cell text on hovered, selected and flagged rows.
- `scripts/verify-provenance.mjs`: checks the values marked `sampled` against the source screenshot.
- `demo/`: a static page on made-up data, plus the script that wires its interactions.
- `skills/building-mms-screens/`: the Agent Skill for people building screens with the skin.
- `tests/`: `node:test` suites; `tests/fixtures/` holds pages the checker must reject.

## Commands

```sh
npm install      # installs dev tools and builds
npm run build
npm test
npm run lint     # prettier --check, stylelint and eslint
npm run format   # fix formatting
```

Run `npm run build` after any change under `src/`; a test fails if the skill's copies are stale. After a
visible change, regenerate `docs/demo.png`: a 1280×800 headless Chrome screenshot of `demo/index.html`.

```sh
google-chrome --headless --hide-scrollbars --window-size=1280,800 --screenshot=docs/demo.png demo/index.html
```

## Rules

- Scope every selector under `[data-skin="mms"]` (or `:root[data-skin="mms"]` for tokens). A test enforces it.
- No colour literals outside `src/tokens.css`. Add a token named by its role (`--mms-flag-bg`, not
  `--mms-light-yellow`), then use it.
- Class names are lower-case kebab-case: `block`, `block-part`, and modifiers as a second class (`.pill.ok`).
- Put state in an ARIA attribute wherever one exists (`aria-selected`, `aria-current`, `aria-expanded`,
  `aria-disabled`, `aria-pressed`). The only state classes are `.sidenav.collapsed` and the combobox's
  `li.active`; do not add more.
- Document every new class in `skills/building-mms-screens/references/components.md`; a test checks it.
- New text/background pairs go in `scripts/contrast.mjs` and must reach 4.5:1. Text that can sit inside
  a grid row goes in `GRID_TEXT`, so it is measured on every row background.
- Mark a token `sampled` only if `scripts/verify-provenance.mjs` checks it against the screenshot.
- Demo and examples use invented names and numbers, labelled as made up. Never real market participants,
  resources, settlement points or prices.
- Do not add ERCOT logos, images, documents or fonts to the repository.
- Comments explain why, in one line where possible.
