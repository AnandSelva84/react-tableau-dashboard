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
  !!current && console.log({ current });
  const addToState = ({ filter_option, filter_value, filter_display_text }) => {
    let newFilterState = filterState;
    const filter = {
      ID: filter_option,
      value: filter_value,
      filter_id: filtersID,
      filter_display_text,
      lvl: 1,
      parentId: null,
    };
    dispatch(editTimeFilterState([filter]));
  };

  const handleChange = (option) => {
    // const handleChange = ({ filter_option, filter_value }) => {
    addToState(option);
  };

  const hadnleDelete = () => {
    dispatch(editTimeFilterState([]));
  };

  return (
    <>
      <SimpleSelect
        deleteable={!!current}
        onDelete={hadnleDelete}
        options={values}
        handleChange={handleChange}
        value={current?.filter_display_text}
      />
    </>
  );
}
