import { latestFilter } from "../../models/filter";

const deleteDuplicate = (array) => {
  const unique = Array.from(new Set(array.map((a) => a.level))).map((level) => {
    return array.find((a) => a.level === level);
  });

  return unique;
};

export const reFormat = (filters) => {
  console.log("refactor raw value", filters);

  const model = latestFilter;

  const AfterMerge = filters.map((filter, index) => {
    const filterLvl = filter.level;
    return {
      ...filter,
      values: [
        ...filter.values,
        ...(filters.filter(
          (toMerge, toMergeIndex) =>
            toMerge.level === filterLvl && toMergeIndex !== index
        )[0]?.values || []),
      ],
    };
  });

  console.log("refactor after merge", AfterMerge);

  const afterDuplicateDelte = deleteDuplicate(AfterMerge);
  console.log("refactor unique", afterDuplicateDelte);

  const afterRefactor = afterDuplicateDelte.map((filter) => ({
    filterId: filter.filter_id,
    filterType: filter.filter_type,
    parentFilterId: filter.parent_filter,
    level: filter.level - 1,
    title: filter.title,
    values: [
      ...filter.values.map((value) => ({
        filterOptionId: value.filter_option,
        filter_value_text: value.filter_value,
        filter_display_text: value.filter_display_text,
        order: value.order,
        parentFilterOptionId: value.parent_filter_option,
      })),
    ],
  }));

  console.log("refactor finish", afterRefactor);
  return afterRefactor;
};
