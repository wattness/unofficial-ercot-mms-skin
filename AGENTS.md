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
- `demo/`: static pages on made-up data, plus the script that wires the interactions of `demo/index.html`.
- `docs/img/`: screenshots of the demo pages and the components, used by the README and `docs/provenance.md`.
- `docs/ercot/`: the ERCOT excerpts listed in `docs/sources.md`, and ERCOT's Website User Agreement.
- `docs/sources.md`, `docs/provenance.md`, `docs/prior-art.md`: where each ERCOT excerpt comes from, the 2007
  record set beside the skin, and the search for similar projects.
- `skills/building-mms-screens/`: the Agent Skill for people building screens with the skin.
- `tests/`: `node:test` suites; `tests/fixtures/` holds pages the checker must reject. `tests/docs.test.mjs` checks
  the SHA-256 list in `docs/sources.md` against the files in `docs/ercot/`.

## Commands

```sh
npm install      # installs dev tools and builds
npm run build
npm test
npm run lint     # prettier --check, stylelint and eslint
npm run format   # fix formatting
```

Run `npm run build` after any change under `src/`; a test fails if the skill's copies are stale.

## Screenshots

After a visible change, regenerate the images in `docs/img/`. They are headless Chrome screenshots at device scale
factor 2, saved as lossless PNG; never quantise them, because they show exact token colours.

- `screen-energy-bid-curve.png` is `demo/energy-bid-curve.html` at 1184×445 CSS pixels, the size of ERCOT's
  screenshot, so the two can be compared at the same scale.
- `screen-energy-offer-curve.png` is `demo/index.html` at 1280×440, the height at which the page fits without
  scrolling.
- `component-*.png` each show one component, built with the markup of `demo/index.html` (after `demo/demo.js` has
  run) or of `skills/building-mms-screens/references/components.md`, alone on a page that loads only
  `dist/mms-skin.css`. Each is cut to the component's box, open popups included, with 16px of page around it; a
  component's own margins add to that. No script in this repository makes them; they were cut with a Playwright
  script kept outside it. Cut a replacement the same way and check it at full size.

```sh
google-chrome --headless --hide-scrollbars --force-device-scale-factor=2 --window-size=1184,445 \
  --screenshot=docs/img/screen-energy-bid-curve.png demo/energy-bid-curve.html
google-chrome --headless --hide-scrollbars --force-device-scale-factor=2 --window-size=1280,440 \
  --screenshot=docs/img/screen-energy-offer-curve.png demo/index.html
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
- ERCOT material goes only in `docs/ercot/`: the excerpts listed in `docs/sources.md` and ERCOT's Website User
  Agreement. Never an ERCOT logo or font, or any other whole ERCOT document. A new excerpt needs its entry there
  first: the document's URL and SHA-256, the page or slide, whether the image is unmodified or a crop, the crop box,
  and the file's SHA-256 in the list under "Excerpt files". Check it at full size: no browser window, logo, contact details,
  or name of a person, company or resource.
- Comments explain why, in one line where possible.
