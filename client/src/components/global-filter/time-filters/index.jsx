import React, { useEffect } from "react";
import TimeFilter from "./time-filter/index";
import useData from "./../../../hooks/useStore";
import DateSelect from "./custom-range-pickers/inedx";
import { useDispatch } from "react-redux";
import { editTimeFilterState } from "../../../redux/actions/shared";

export default function TimeFilters(props) {
  const dispatch = useDispatch();
  const {
    timeFilterState,
    timeFilters,
    appliedTimeIntervals,
  } = useData().sharedReducer;
  const hasCustomRange = timeFilterState.find((f) => f.ID === "Custom_Range");

  const startDate =
    timeFilterState.find((f) => f.filter_type === "Range Start")?.value || "";
  const endDate =
    timeFilterState.find((f) => f.filter_type === "Range End")?.value || "";

  const getData = (range) => {
    const rangeData = timeFilters.find(
      (f) => f.filter_type === `Range ${range}`
    );
    return rangeData;
  };

  useEffect(() => {
    dispatch(editTimeFilterState([...appliedTimeIntervals]));
  }, []);

  const rangeStartData = getData("Start");
  const rangeEndData = getData("End");

  const handleStartChange = (value) => {
    const rangeStartFilter = {
      value,
      ...rangeStartData,
    };
    const deletePrev = timeFilterState.filter(
      (f) => f.filter_type !== "Range Start"
    );

    dispatch(editTimeFilterState([...deletePrev, { ...rangeStartFilter }]));
  };
  const handleEndChange = (value) => {
    const rangeEndFilter = {
      value,
      ...rangeEndData,
    };
    const deletePrev = timeFilterState.filter(
      (f) => f.filter_type !== "Range End"
    );
    dispatch(editTimeFilterState([...deletePrev, { ...rangeEndFilter }]));
  };

  return (
    <>
      <TimeFilter />
      {!!hasCustomRange && (
        <DateSelect
          onChange={handleStartChange}
          label={rangeStartData.title}
          value={startDate}
        />
      )}
      {!!hasCustomRange && (
        <DateSelect
          onChange={handleEndChange}
          label={rangeEndData.title}
          value={endDate}
        />
      )}
    </>
  );
}
