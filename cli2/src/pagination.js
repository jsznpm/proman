// Pure page-math used by the TUI list screens. Page index is clamped to
// [0, totalPages-1].

/**
 * Stateful pager over a fixed array.
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
