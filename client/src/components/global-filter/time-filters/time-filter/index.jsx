import React from "react";
import SimpleSelect from "../../../simple-select/simple-select";
import useData from "./../../../../hooks/useStore";
import { useDispatch } from "react-redux";
import { addFilter } from "../../../../redux/actions/shared";
import { editFilterState } from "./../../../../redux/actions/shared";

export default function TimeFilter(props) {
  debugger;
  const dispatch = useDispatch();
  const { timeFilters, filterState } = useData().sharedReducer;

  const firstLvlFilters = timeFilters.filter((f) => f.level === 1);
  const filtersID = firstLvlFilters[0].filter_id;
  const currentTimeFilter =
    filterState?.filter((f) => f.filter_id === filtersID)[0] || null;
  const values = firstLvlFilters.map((f) => f.values).flat();

  const deleteFromState = (ID) => {
    const withoutfilter = filterState.filter((f) => f.ID !== ID);
    return withoutfilter;
  };

  const addToState = (filter_option, filter_value) => {
    debugger;
    let newFilterState = filterState;
    const filter = {
      ID: filter_option,
      value: filter_value,
      filter_id: filtersID,
      lvl: 1,
      parentId: null,
    };
    if (!!currentTimeFilter) {
      //   const deletedPrev = deleteFromState(filter_option);
      const deletedPrev = filterState.filter((f) => f.filter_id !== filtersID);
      newFilterState = [...deletedPrev, filter];
      dispatch(editFilterState([...newFilterState]));
      return;
    }

    dispatch(editFilterState([...newFilterState, filter]));
  };

  const handleChange = ({ filter_option, filter_value }) => {
    debugger;
    addToState(filter_option, filter_value);
  };

  return (
    <>
      <SimpleSelect
        options={values}
        handleChange={handleChange}
        value={currentTimeFilter}
      />
    </>
  );
}
