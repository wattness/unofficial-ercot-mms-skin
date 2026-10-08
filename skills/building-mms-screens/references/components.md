# Components

Every class the skin defines, with the markup it expects. State is carried by ARIA attributes where one
exists (`aria-selected`, `aria-current`, `aria-expanded`, `aria-disabled`, `aria-pressed`). Two states have
no ARIA attribute on the element and use a class: `.sidenav.collapsed` and the combobox's `li.active`.
Modifiers are a second class on the same element (`.pill.ok`, `.btn.primary`).

Contents: page frame, masthead, market clock, side navigation, tab strip, section, query panel and
actions, date picker and calendar, combobox, results grid, hourly grid, notes and pills, info popover,
code, status bar.

## Page frame

```html
<html lang="en" data-skin="mms">
  <body>
    <header class="masthead">…</header>
    <div class="layout">
      <nav class="sidenav" aria-label="Screens">…</nav>
      <main class="layout-main">
        <div class="tabstrip" role="tablist">…</div>
        <div class="tabstrip-rule"></div>
        <div class="content">…</div>
      </main>
    </div>
    <footer class="statusbar">…</footer>
  </body>
</html>
```

- `.layout`, `.layout-main`: side navigation beside the main column. The tab strip switches the main
  content, so it sits inside `<main>`.
- `.content`: the main area; leaves room for the fixed status bar.
- `.spacer`: a flex filler that pushes what follows to the right (masthead, actions row, status bar).
- `.prose`: a padded block for headings (`h2`, `h3`) and paragraphs.

## Masthead

```html
<header class="masthead">
  <h1 class="masthead-title">Market Management</h1>
  <span class="env-badge">TEST</span>
  <span class="spacer"></span>
  <span class="masthead-controls">
    <label for="res">Resource</label>
    <select id="res" class="compact">
      <option>UNIT_A</option>
    </select>
  </span>
  <span class="masthead-user">Signed in as <b>user</b></span>
</header>
```

- `.env-badge`: marks a non-production environment.
- `select.compact`: a 17px select for the masthead.
- `.badge`: a small uppercase tag, e.g. `<span class="badge">Sample</span>`.

## Market clock

```html
<span class="clock">
  <span class="clock-market"><b>09:41</b> CT</span>
  <span class="clock-local">10:41 local</span>
  <span class="phase open">DAM open<span class="phase-detail">for 09 Mar</span></span>
  <span class="countdown closing">closes in <b>0:19</b></span>
</span>
```

- `.phase` modifiers: `open`, `closing`, `urgent`, `clearing`, `posted`, `adjustment`, `realtime`, `idle`.
- `.countdown` modifiers: `closing`, `urgent`.

## Side navigation

```html
<nav class="sidenav" aria-label="Screens">
  <button class="sidenav-toggle" type="button" aria-expanded="true" aria-label="Collapse navigation">«</button>
  <div role="group" aria-labelledby="g1">
    <h2 id="g1" class="sidenav-heading">Day-Ahead</h2>
    <button class="sidenav-item" type="button" aria-current="page">Energy Offers</button>
    <button class="sidenav-item" type="button" aria-disabled="true">PTP Obligation Bids</button>
  </div>
</nav>
```

- `.sidenav.collapsed`: 22px wide; hide the groups and set the toggle's `aria-expanded="false"`.

## Tab strip

```html
<div class="tabstrip" role="tablist" aria-label="Energy Offers">
  <button class="tab" type="button" role="tab" aria-selected="true"><span>Energy Offer Curve</span></button>
  <button class="tab" type="button" role="tab" aria-selected="false"><span>Awards</span></button>
  <button class="tab" type="button" role="tab" aria-selected="false" aria-disabled="true"><span>Bids</span></button>
</div>
<div class="tabstrip-rule"></div>
```

The inner `<span>` is required: it draws the tab face inside the slanted edge.

## Section

```html
<section class="section">
  <button class="section-header" type="button" aria-expanded="true" aria-controls="s1">
    <span class="section-caret" aria-hidden="true">▼</span>Query
    <span class="section-note">UNIT_A · 2030-03-08</span>
  </button>
  <div id="s1">…</div>
</section>
```

## Query panel and actions

```html
<div class="query">
  <span class="query-field"
    ><label for="st">Status</label
    ><select id="st">
      …
    </select></span
  >
  <label class="checkbox"><input type="checkbox" /> Include expired</label>
</div>
<div class="actions">
  <button class="btn primary" type="button">Submit</button>
  <button class="btn" type="button">Copy</button>
  <button class="btn danger" type="button">Cancel</button>
  <span class="spacer"></span>
  <span class="actions-hint">Ctrl+Enter submits</span>
</div>
```

- `button.btn` modifiers: `primary`, `danger`; use the `disabled` attribute for the disabled look.
- `.link-button`: a button styled as a link, for actions that change the view rather than navigate.

## Date picker and calendar

```html
<label for="day">Operating Day</label>
<span class="datepicker">
  <input id="day" class="datepicker-field" type="text" value="2030-03-08" />
  <button class="datepicker-button" type="button" aria-label="Open calendar" aria-expanded="true">…</button>
  <div class="calendar" role="dialog" aria-label="Choose a day">
    <div class="calendar-head">
      <button type="button" aria-label="Previous month">‹</button>
      <span>March 2030</span>
      <button type="button" aria-label="Next month">›</button>
    </div>
    <table class="calendar-grid">
      <thead>
        <tr>
          <th scope="col">Su</th>
          …
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="pad"></td>
          <td><button class="calendar-day" type="button" aria-pressed="true">8</button></td>
          …
        </tr>
      </tbody>
    </table>
    <div class="calendar-foot">Days without data are disabled.</div>
  </div>
</span>
```

- `td.pad`: an empty cell before the 1st or after the last day.
- `.calendar-day` with `disabled`: a day that cannot be chosen; draw it rather than omit it.

## Combobox (searchable select)

```html
<label id="qse-label">QSE</label>
<span class="combobox">
  <button
    class="combobox-button"
    type="button"
    aria-haspopup="listbox"
    aria-expanded="true"
    aria-labelledby="qse-label qse-value"
  >
    <span id="qse-value" class="combobox-value">QSE_A</span><span class="combobox-caret" aria-hidden="true">▾</span>
  </button>
  <div class="combobox-popup">
    <input type="text" aria-label="Search" aria-controls="qse-options" aria-activedescendant="qse-a" />
    <ul id="qse-options" role="listbox" aria-labelledby="qse-label">
      <li id="qse-a" role="option" aria-selected="true" class="active">QSE_A<span class="combobox-hint">hint</span></li>
      <li id="qse-b" role="option" aria-selected="false">QSE_B</li>
    </ul>
    <div class="combobox-empty" hidden>no match</div>
  </div>
</span>
```

- `li.active`: the option the arrow keys are on; point the search input's `aria-activedescendant` at its id.
- `aria-selected="true"`: the current value.
- `.combobox-empty`: shown in place of the list when nothing matches. It sits outside the listbox, which may
  hold only options; hide the list while it shows.

## Results grid

```html
<div class="grid-title">Energy Offer Curve · UNIT_A</div>
<div class="grid-scroll">
  <table class="grid">
    <thead>
      <tr>
        <th scope="col">Point</th>
        <th scope="col" class="num">MW</th>
      </tr>
    </thead>
    <tbody>
      <tr class="selectable" aria-selected="true">
        <td>1</td>
        <td class="num">10.0</td>
      </tr>
      <tr class="flagged">
        <td>2</td>
        <td class="num">20.0</td>
      </tr>
    </tbody>
  </table>
</div>
```

- `.grid-scroll`: scrolls after 340px; add `.no-clip` when the table is short and holds popovers.
- `tr.selectable`: clickable rows; `aria-selected="true"` paints the selection colour.
- `tr.flagged`: draws attention without using the selection colour.
- `td.num` / `th.num`: right-aligned tabular figures. `.num` also works outside tables.
- `td.empty`: an italic placeholder such as "none".
- `td.truncate`: one line with an ellipsis; put the full value in `title`.
- `td.multiline` with a `.clamp-3` block inside: wraps and clamps long text to three lines.
- `table.grid.money`: `td.neg` reads as a loss (danger colour).

## Hourly grid

```html
<table class="hourly">
  <thead>
    <tr>
      <th scope="col" class="row-label">Hour Ending</th>
      <th scope="col">1</th>
      …
    </tr>
  </thead>
  <tbody>
    <tr aria-selected="false">
      <th scope="row" class="row-label">Net output (MW)</th>
      <td class="neg">-10.0</td>
      <td class="zero">0.0</td>
      <td class="pos edited"><input type="number" value="10.0" aria-label="Net output (MW), hour ending 3" /></td>
    </tr>
  </tbody>
</table>
```

- `.row-label`: the sticky first column.
- Cell modifiers: `neg` (cool), `pos` (warm), `zero`, `highlight`, `edited`. A zero is faint only in a
  read-only cell; in an input, a highlighted or edited cell, or a selected row it uses `--mms-text-muted`.
- Inputs in the grid have no visible label; give each an `aria-label` naming the row and hour.
- `tr[aria-selected="true"]`: the selected row.

## Notes, pills and inline text

```html
<p class="note">Neutral note.</p>
<p class="note warn">Warning.</p>
<p class="note bad">Error.</p>
<ul class="note">
  <li>A note as a list.</li>
</ul>
<span class="pill ok">ACCEPTED</span> <span class="pill warn">PENDING</span> <span class="pill bad">REJECTED</span>
<span class="pill muted">EXPIRED</span>
<span class="aside">awaiting <b>validation</b></span>
<span class="muted">secondary text</span>
```

## Info popover

```html
<span class="info" tabindex="0">
  Price<span class="info-mark" aria-hidden="true">i</span>
  <span class="popover" role="tooltip"><b>Price</b> for the segment. <i>Source.</i></span>
</span>
```

Shows on hover and on keyboard focus. In the last column it opens leftwards.

## Code

- `code`, `.mono`: inline monospace.
- `pre.listing`: a scrolling block for XML or other source.

## Status bar

```html
<footer class="statusbar">
  <span class="statusbar-code ok">OK</span>
  <span>Query returned 5 rows.</span>
  <span class="spacer"></span>
  <span class="statusbar-stamp">2030-03-08 09:41:07 CT</span>
</footer>
```

- `.statusbar-code` modifiers: `ok`, `warn`, `bad`.
