---
name: building-mms-screens
license: MIT
description: Builds dense market-operations screens in HTML (offer and bid grids, hourly schedules, query panels, tab strips, status bars) with the MMS skin, an unofficial CSS recreation of the ERCOT MMS look, and checks pages built with it. Use when asked for an MMS-style or ERCOT-style market screen, a compact data-entry or results grid in that look, or a review of markup that uses data-skin="mms".
compatibility: The checker script needs Node.js 22 or later. The stylesheet needs only a browser.
---

# Building MMS-style screens

The skin is one stylesheet, `assets/mms-skin.css`. It is scoped: nothing applies until the page's
`<html>` element has `data-skin="mms"`. Colours and sizes are CSS custom properties named `--mms-*`;
`assets/tokens.json` holds the same values for charts and other code.

## Steps

1. Copy `assets/starter.html` and `assets/mms-skin.css` to the target folder. Keep the stylesheet link.
2. Lay the page out in this order: masthead, tab strip and its rule, content sections, status bar. Add
   side navigation only when there are more screens than fit in the tab strip.
3. Build each part from `references/components.md`. Use its markup as written: the skin keys on those
   classes and ARIA attributes.
4. Run the checker from this skill's folder and fix every error:

   ```sh
   node scripts/check-screen.mjs path/to/page.html
   ```

   Warnings list classes the skin does not define; they are fine for the page's own layout.

## Rules

Density

- One record per row at the 23px row height. Do not wrap cells; use `td.truncate` with a `title`, or
  `td.multiline` with `.clamp-3` for long text.
- Put the query panel and its actions above the results they control, in one collapsible section.
- Group related screens as tabs; keep labels to two or three words.

Legibility

- Numbers go in `.num` cells: right-aligned, tabular figures, a fixed number of decimals per column.
- Put units in the column header (`MW`, `$/MWh`), not in every cell.
- Text you add is 10px or larger. The skin sets badges and navigation headings at 9-9.5px, bold
  and upper-case; do not reuse those sizes for content, and do not override the skin's sizes.
- Use the selection colour (`aria-selected="true"`) only for the row the user picked; use `tr.flagged`
  to draw attention to a row.

Accessibility

- State goes in an ARIA attribute wherever one exists: `aria-selected` (tabs, rows, options),
  `aria-current="page"` (navigation), `aria-expanded` (section headers, toggles), `aria-disabled`
  (unavailable tabs and items), `aria-pressed` (calendar days). The only state classes are
  `.sidenav.collapsed` and the combobox's `li.active`.
- Tab strips need `role="tablist"` and each tab `role="tab"`; header cells need `scope`.
- Every input, select and listbox has a label: a `<label>`, or `aria-label` where a visible label would
  repeat a column header. Buttons that show only a glyph or icon have `aria-label`.
- The skin's text colours reach 4.5:1 on the backgrounds the skin puts them on, including hovered,
  selected and flagged rows. The exceptions are zeros in read-only hourly cells (2.46:1) and disabled
  states: do not use `--mms-text-zero`, `--mms-text-disabled`, `--mms-text-unavailable` or
  `--mms-text-faint` for content. Check the ratio yourself before putting a text token on a background the
  skin does not pair it with.

Do

- Use `var(--mms-*)` for every colour, including inline SVG (`currentColor` also works).
- Label invented or sample data as such, for example with `<span class="badge">Sample data</span>`.

Do not

- Write colour literals (`#hex`, `rgb()`, named colours) in styles or SVG attributes.
- Add ERCOT's logo, seal or name as the page's brand. If a screen could be mistaken for ERCOT's own
  system, say on the page that it is not.
- Copy real market participants', resources' or prices' data into examples.
