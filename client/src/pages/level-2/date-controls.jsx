import React from "react";
import useData from "../../hooks/useStore";
import DatePickers from "./date-pickers";

const DateControls = () => {
  const { filterState } = useData().sharedReducer;
  const showPickers = filterState.find((f) => f.value === "Custom");

  return <>{!!showPickers && <DatePickers />}</>;
};

export default DateControls;
