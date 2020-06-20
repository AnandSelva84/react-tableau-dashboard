export const continuesFilter = (filterState, onFilterEnd) => {
  let locFilterState = filterState;
  let i = 0;

  while (i !== 10) {
    let prevLength = locFilterState.length;

    locFilterState = locFilterState.filter(
      (f) => locFilterState.map((f) => f.ID).includes(f.parentId) || f.lvl === 0
    );
    const condition = locFilterState.length === prevLength;
    if (locFilterState.length == prevLength && i !== 0) {
      onFilterEnd(locFilterState);
      // setValuesUpdated(true);
      console.log("match", locFilterState);
      break;
    }
    i++;

    // if (i === 3) {
    // dispatch(editFilterState([...locFilterState]));
    // }
    // if (i === 3)
  }
};
