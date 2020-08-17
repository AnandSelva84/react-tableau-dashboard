const filterMethod = (locFilterState) => {
  return locFilterState.filter(
    (filter) =>
      locFilterState.map((f) => f.ID).includes(filter.parentId) ||
      filter.lvl === 0
  );
};

export const continuesFilter = (filterState, onFilterEnd) => {
  let locFilterState = filterState;
  let i = 0;
  while (i !== 10) {
    let prevLength = locFilterState.length;
    locFilterState = filterMethod(locFilterState);
    if (locFilterState.length === prevLength && i !== 0) {
      onFilterEnd(locFilterState);
      return locFilterState;
    }
    i++;
  }
};
