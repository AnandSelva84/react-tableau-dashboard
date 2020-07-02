const createObj = (key, value) => ({
  [key]: value,
});

const deleteDuplicate = (appliedFilters) => {
  let filters = [];
  let ids = [];
  appliedFilters.forEach((filter) => {
    const id = Object.keys(filter)[0];
    if (!ids.includes(id)) {
      filters.push(filter);
      ids.push(id);
    }
  });
  return filters;
};

const getFilterValues = (appliedFilters = [], id = "") => {
  if (!!id) {
    const duplicatedFilters = appliedFilters
      .filter((filter) => filter.id === id)
      .map((v) => v.value);
    return duplicatedFilters;
  }
};

export const fromAppliedToOptions = (appliedFilters = []) => {
  const duplicated = appliedFilters.map((filter) => ({
    ...createObj(filter.id, getFilterValues(appliedFilters, filter.id)),
  }));
  return deleteDuplicate(duplicated);
};
