export const isExist = (filterState, id, value) => {
  const idExist = filterState.find((filter) => filter.id === id);
  // if (!!!idExist) return false;
  const valueExist = filterState.find((filter) => filter.value === value);
  // if (!!!valueExist) return false;

  // return !!idExist && !!valueExist;
  return !!valueExist && !!idExist;
};

export const newIsExist = (filterState, id) => {
  const _isExist = filterState.find((filter) => filter.id === id);
  return _isExist;
};
