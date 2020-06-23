export const fromNewFiltersToState = (newFilters) => {
  return newFilters.map((filter) => ({
    ...filter,
    values: filter.values.map((value) => ({
      ID: value.filter_option,
      value: value.filter_value,
      id: filter.title,
    })),
  }));
};

export const getFilterByValue = (newFilters, ID) => {
  return newFilters.find((filter) => {
    filter.values.map((value) => value.filter_option).includes(ID);
  });
};
