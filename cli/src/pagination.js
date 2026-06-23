// Reusable pagination. Pure page-math (createPaginator) plus a small helper
// to build inquirer nav choices. Used by both the folder list and the
// content list so paging behaves identically everywhere.

// Sentinel values returned when a nav item is chosen. Distinct from any real
// item value, so callers can switch on them safely.
export const NAV = Object.freeze({
  NEXT: "__nav_next__",
  PREV: "__nav_prev__",
  QUIT: "__nav_quit__",
  BACK: "__nav_back__",
});

/**
 * Stateful pager over a fixed array. Page index is clamped to [0, totalPages-1].
 */
export function createPaginator(items, pageSize = 10) {
  let page = 0;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  return {
    get page() {
      return page;
    },
    get totalPages() {
      return totalPages;
    },
    get hasNext() {
      return page < totalPages - 1;
    },
    get hasPrev() {
      return page > 0;
    },
    next() {
      if (page < totalPages - 1) page++;
    },
    prev() {
      if (page > 0) page--;
    },
    pageItems() {
      const start = page * pageSize;
      return items.slice(start, start + pageSize);
    },
  };
}

/**
 * Build the nav choices appended after a page of items.
 * Next/Prev appear only when available. `exit` is the QUIT (folders) or
 * BACK (content) sentinel + label.
 */
export function navChoices(pager, { exit }) {
  const choices = [];
  if (pager.hasPrev || pager.hasNext) {
    choices.push({ name: "──────────", value: "__sep__", disabled: " " });
  }
  if (pager.hasNext) choices.push({ name: "▶ Next page", value: NAV.NEXT });
  if (pager.hasPrev) choices.push({ name: "◀ Prev page", value: NAV.PREV });
  if (exit) choices.push({ name: exit.label, value: exit.value });
  return choices;
}
