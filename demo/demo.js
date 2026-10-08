// Interaction for the demo page only. All data here is made up.

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const COP_ROWS = [
  { label: "Status", values: Array(24).fill("ON"), text: true },
  { label: "HSL (MW)", values: Array(24).fill(50) },
  { label: "LSL (MW)", values: Array(24).fill(-50) },
  {
    label: "RRS (MW)",
    values: [0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0],
  },
  {
    label: "Net output (MW)",
    values: [0, 0, -10, -10, -10, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0],
    editable: true,
  },
];

const signClass = (v) => (v < 0 ? "neg" : v > 0 ? "pos" : "zero");

function buildCopGrid(table) {
  const head = table.createTHead().insertRow();
  head.innerHTML = '<th scope="col" class="row-label">Hour Ending</th>';
  for (let h = 1; h <= 24; h++) head.insertAdjacentHTML("beforeend", `<th scope="col">${h}</th>`);
  const body = table.createTBody();
  for (const row of COP_ROWS) {
    const tr = body.insertRow();
    tr.innerHTML = `<th scope="row" class="row-label">${row.label}</th>`;
    row.values.forEach((v, i) => {
      const td = tr.insertCell();
      if (!row.text) td.className = signClass(v);
      if (row.editable) {
        const input = document.createElement("input");
        input.type = "number";
        input.value = v.toFixed(1);
        input.setAttribute("aria-label", `${row.label}, hour ending ${i + 1}`);
        input.addEventListener("change", () => (td.className = `${signClass(Number(input.value))} edited`));
        td.append(input);
      } else {
        td.textContent = row.text ? v : v.toFixed(1);
      }
    });
  }
}

const closeOnOutsideClick = (root, close) =>
  document.addEventListener("pointerdown", (e) => !root.contains(e.target) && close());

function initTabs() {
  const tabs = $$('[role="tab"]');
  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      if (tab.getAttribute("aria-disabled") === "true") return;
      for (const t of tabs) {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      }
    });
  }
}

function initSections() {
  for (const header of $$(".section-header")) {
    header.addEventListener("click", () => {
      const open = header.getAttribute("aria-expanded") !== "true";
      header.setAttribute("aria-expanded", String(open));
      $(".section-caret", header).textContent = open ? "▼" : "►";
      document.getElementById(header.getAttribute("aria-controls")).hidden = !open;
    });
  }
}

function initRows() {
  for (const row of $$(".grid tr.selectable")) {
    row.addEventListener("click", () => {
      for (const r of $$("tr.selectable", row.parentElement)) r.setAttribute("aria-selected", String(r === row));
    });
  }
}

function initSidenav() {
  const nav = $(".sidenav");
  const toggle = $(".sidenav-toggle", nav);
  toggle.addEventListener("click", () => {
    const collapsed = nav.classList.toggle("collapsed");
    toggle.textContent = collapsed ? "»" : "«";
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Expand navigation" : "Collapse navigation");
    $("#nav-groups").hidden = collapsed;
  });
  const items = $$(".sidenav-item", nav);
  for (const item of items) {
    item.addEventListener("click", () => {
      if (item.getAttribute("aria-disabled") === "true") return;
      for (const i of items) i.removeAttribute("aria-current");
      item.setAttribute("aria-current", "page");
    });
  }
}

// A made-up month: days after the 20th have no data and are drawn disabled.
function initDatepicker() {
  const picker = $(".datepicker");
  const field = $(".datepicker-field", picker);
  const button = $(".datepicker-button", picker);
  let calendar;

  const close = () => {
    calendar?.remove();
    calendar = null;
    button.setAttribute("aria-expanded", "false");
  };

  const open = () => {
    const selected = Number(field.value.slice(-2));
    const first = new Date(Date.UTC(2030, 2, 1)).getUTCDay();
    const cells = [];
    for (let i = 0; i < first; i++) cells.push('<td class="pad"></td>');
    for (let d = 1; d <= 31; d++) {
      const attrs = d > 20 ? " disabled" : ` aria-pressed="${d === selected}"`;
      cells.push(`<td><button type="button" class="calendar-day"${attrs}>${d}</button></td>`);
    }
    while (cells.length % 7) cells.push('<td class="pad"></td>');
    const rows = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(`<tr>${cells.slice(i, i + 7).join("")}</tr>`);

    calendar = document.createElement("div");
    calendar.className = "calendar";
    calendar.setAttribute("role", "dialog");
    calendar.setAttribute("aria-label", "Choose an operating day");
    calendar.innerHTML = `
      <div class="calendar-head">
        <button type="button" aria-label="Previous month" disabled>‹</button>
        <span>March 2030</span>
        <button type="button" aria-label="Next month" disabled>›</button>
      </div>
      <table class="calendar-grid">
        <thead><tr>${["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => `<th scope="col">${d}</th>`).join("")}</tr></thead>
        <tbody>${rows.join("")}</tbody>
      </table>
      <div class="calendar-foot">Days without data are drawn and disabled.</div>`;
    calendar.addEventListener("click", (e) => {
      const day = e.target.closest(".calendar-day");
      if (!day || day.disabled) return;
      field.value = `2030-03-${day.textContent.padStart(2, "0")}`;
      close();
      field.focus();
    });
    picker.append(calendar);
    button.setAttribute("aria-expanded", "true");
  };

  button.addEventListener("click", () => (calendar ? close() : open()));
  field.addEventListener("click", () => (calendar ? close() : open()));
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  closeOnOutsideClick(picker, close);
}

function initCombobox() {
  const options = ["QSE_DEMO_A", "QSE_DEMO_B", "QSE_DEMO_C"];
  const box = $(".combobox");
  const button = $(".combobox-button", box);
  const value = $(".combobox-value", box);
  let popup, search, list, empty;
  let active = 0;

  const close = (refocus = false) => {
    if (!popup) return;
    popup.remove();
    popup = null;
    button.setAttribute("aria-expanded", "false");
    if (refocus) button.focus();
  };

  const items = () => $$("li[role=option]", list);

  const highlight = (index) => {
    active = index;
    items().forEach((li, i) => li.classList.toggle("active", i === index));
    const li = items()[index];
    if (li) search.setAttribute("aria-activedescendant", li.id);
    else search.removeAttribute("aria-activedescendant");
  };

  const render = () => {
    const shown = options.filter((o) => o.toLowerCase().includes(search.value.toLowerCase()));
    list.replaceChildren(
      ...shown.map((o) => {
        const li = document.createElement("li");
        const hint = document.createElement("span");
        li.id = `qse-option-${o}`;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", String(o === value.textContent));
        li.dataset.value = o;
        hint.className = "combobox-hint";
        hint.textContent = "made up";
        li.append(o, hint);
        return li;
      }),
    );
    list.hidden = !shown.length;
    empty.hidden = Boolean(shown.length);
    empty.textContent = `no match for “${search.value}”`;
    highlight(Math.min(active, Math.max(shown.length - 1, 0)));
  };

  const choose = (li) => {
    if (!li?.dataset.value) return;
    value.textContent = li.dataset.value;
    close(true);
  };

  const open = () => {
    popup = document.createElement("div");
    popup.className = "combobox-popup";
    popup.innerHTML =
      '<input type="text" aria-label="Search" placeholder="Search" aria-controls="qse-options">' +
      '<ul id="qse-options" role="listbox" aria-labelledby="qse-label"></ul>' +
      '<div class="combobox-empty" hidden></div>';
    box.append(popup);
    [search, list, empty] = [$("input", popup), $("ul", popup), $(".combobox-empty", popup)];
    button.setAttribute("aria-expanded", "true");
    active = Math.max(options.indexOf(value.textContent), 0);
    render();
    search.focus();
    search.addEventListener("input", render);
    search.addEventListener("keydown", (e) => {
      const count = items().length;
      if ((e.key === "ArrowDown" || e.key === "ArrowUp") && count) {
        e.preventDefault();
        highlight((active + (e.key === "ArrowDown" ? 1 : -1) + count) % count);
      } else if (e.key === "Enter") {
        // Without this the keypress reaches the refocused button and reopens the popup.
        e.preventDefault();
        choose(items()[active]);
      } else if (e.key === "Escape") close(true);
    });
    list.addEventListener("pointermove", (e) => {
      const index = items().indexOf(e.target.closest("li[role=option]"));
      if (index >= 0 && index !== active) highlight(index);
    });
    list.addEventListener("click", (e) => choose(e.target.closest("li[role=option]")));
  };

  button.addEventListener("click", () => (popup ? close() : open()));
  closeOnOutsideClick(box, close);
}

buildCopGrid($("#cop-grid"));
initTabs();
initSections();
initRows();
initSidenav();
initDatepicker();
initCombobox();
