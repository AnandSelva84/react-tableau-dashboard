import React from "react";
import TimeFilter from "./time-filter/index";
import useData from "./../../../hooks/useStore";
import CustomRange from "./custom-range-pickers/inedx";
import { useDispatch } from "react-redux";
import { editTimeFilterState } from "../../../redux/actions/shared";

export default function TimeFilters(props) {
  const dispatch = useDispatch();
  const { timeFilterState, timeFilters } = useData().sharedReducer;
  const hasCustomRange = timeFilterState.find((f) => f.ID === "Custom_Range");

  const getData = (range) => {
    const rangeData = timeFilters.find(
      (f) => f.filter_type === `Range ${range}`
    );
    return rangeData;
  };

  const rangeStartData = getData("Start");
  const rangeEndData = getData("End");

  const handleStartChange = (value) => {
    const rangeStartFilter = {
      value,
      ...rangeStartData,
    };
    dispatch(
      editTimeFilterState([...timeFilterState, { ...rangeStartFilter }])
    );
  };
  const handleEndChange = (value) => {
    const rangeEndFilter = {
      value,
      ...rangeEndData,
    };
    dispatch(editTimeFilterState([...timeFilterState, { ...rangeEndFilter }]));
  };

  return (
    <>
      <TimeFilter />
      {!!hasCustomRange && (
        <CustomRange
          onChange={handleStartChange}
          label={rangeStartData.title}
        />
      )}
      {!!hasCustomRange && (
        <CustomRange onChange={handleEndChange} label={rangeEndData.title} />
      )}
    </>
  );
}
