import React from "react";
import SimpleSelect from "../../../simple-select/simple-select";
import useData from "./../../../../hooks/useStore";
import { useDispatch } from "react-redux";
import {
  addFilter,
  editTimeFilterState,
} from "../../../../redux/actions/shared";
import { editFilterState } from "./../../../../redux/actions/shared";

export default function TimeFilter(props) {
  const dispatch = useDispatch();
  const { timeFilters, filterState, timeFilterState } = useData().sharedReducer;

  const firstLvlFilters = timeFilters.filter((f) => f.level === 1);
  const filtersID = firstLvlFilters[0].filter_id;
  const current = timeFilterState.find((f) => f.filter_id === filtersID);
  const values = firstLvlFilters.map((f) => f.values).flat();

  const addToState = (filter_option, filter_value) => {
    let newFilterState = filterState;
    const filter = {
      ID: filter_option,
      value: filter_value,
      filter_id: filtersID,
      lvl: 1,
      parentId: null,
    };
    dispatch(editTimeFilterState([filter]));
  };

  const handleChange = ({ filter_option, filter_value }) => {
    addToState(filter_option, filter_value);
  };

  return (
    <>
      <SimpleSelect
        options={values}
        handleChange={handleChange}
        value={current}
      />
    </>
  );
}
