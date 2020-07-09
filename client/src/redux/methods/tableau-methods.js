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

const fromArrayToObject = (array = []) => {
  let data = {};
  array.forEach((elem) => {
    const key = Object.keys(elem)[0];
    data = {
      ...data,

      [key]: elem[key],
    };
  });
  return data;
};

export const fromAppliedToOptions = (appliedFilters = []) => {
  const duplicated = appliedFilters.map((filter) => ({
    ...createObj(filter.filter_id, getFilterValues(appliedFilters, filter.id)),
  }));
  return fromArrayToObject(deleteDuplicate(duplicated));
};
