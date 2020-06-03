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

const getIds = (array, filter_id) => {
  const ids = array
    .filter((filter) => filter.filter_id === filter_id)
    .map((filter) => filter.values)
    ?.map((option) => option.filter_option);
  console.log("fill get ids", ids);
  return ids;
};
export const getPossibleChoicesToFill = (newFilters, local, onAccept) => {
  const localIds = ["Business"];
  newFilters.forEach((newFilter) => {
    if (newFilter.level > 1) {
      const possibleForTitle = newFilters.filter(
        (filter) => filter.filter_id === newFilter.filter_id
      )[0].values;
      console.log("fill possible ", possibleForTitle);
      console.log("fill for  ", newFilter.title);
      // const values = possibleForTitle.map((poss) => poss.values);
      // console.log("fill values", values);

      const afterFilter = possibleForTitle.filter((value) =>
        localIds.includes(value?.parent_filter_option)
      );
      console.log("fill after Filter", afterFilter);
      localIds.push(...afterFilter.map((after) => after.filter_option));
      console.log("fill ids after filtering ", localIds);

      console.log(
        "fill after filtering accoring to chosen ids ",
        possibleForTitle.map((poss) => poss.filter_option)
      );
    }
    // console.log(
    //   "fill after getting ids  ",
    //   possibleForTitle.map((option) => option.filter_id)
    // );
    // if(possibleForTitle.map((option) => option.filter_id)?.length)
    // localIds.push(getIds(newFilters, newFilter.title));
    // console.log("fill localids  ", localIds);
  });

  // return newFilters
  //   .filter((filter) => filter.title === title)[0]
  //   .values.filter((filter) => chosenIds.includes(filter.parent_filter_option));
  return localIds;
};
