// import { latestFilter } from "../../models/filter";

const deleteDuplicate = (array) => {
  const unique = Array.from(new Set(array.map((a) => a.level))).map((level) => {
    return array.find((a) => a.level === level);
  });

  return unique;
};

// filterOptionId: "Business_Bank"
// filter_display_text: "Bank"
// filter_value_text: "Bank"
// order: 1
// parentFilterOptionId: "Business"

export const fromOptionsToChips = (values, filter) => {
  return values.map((value) => ({
    ID: value.filterOptionId,
    id: filter.title,
    lvl: filter.level - 1,
    parentId: value.parentFilterOptionId,
    value: value.filter_value_text,
  }));
};

export const reFormat = (filters) => {
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

  //aftermerge should be filtered according to parent in chosen ids

  const afterDuplicateDelte = deleteDuplicate(AfterMerge);

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

  return afterRefactor;
};

// const getPossibleChoicesToFill = (newFilters, local, onAccept) => {
//   const localIds = ["Business"];
//   newFilters.forEach((newFilter) => {
//     if (newFilter.level > 1) {
//       const possibleForTitle = newFilters.filter(
//         (filter) => filter.filter_id === newFilter.filter_id
//       )[0].values;

//       const afterFilter = possibleForTitle.filter((value) =>
//         localIds.includes(value?.parent_filter_option)
//       );
//       localIds.push(...afterFilter.map((after) => after.filter_option));
//     }
//   });

// return newFilters
//   .filter((filter) => filter.title === title)[0]
//   .values.filter((filter) => chosenIds.includes(filter.parent_filter_option));
// return localIds;
// };
