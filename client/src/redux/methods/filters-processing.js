export const extractFilters = (filterResponse) => {
  const allFilters = filterResponse?.filters || []; //INCLUDING TIME INTERVAL FILTERS
  const reportFilters = allFilters.filter((f) => f.group_id === "WIM Rollup");
  const timeFilters = allFilters.filter(
    (f) => f.group_id === "Date Interval Group"
  );
  return { reportFilters, timeFilters };
};
