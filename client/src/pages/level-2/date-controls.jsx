import React from "react";
import Option from "../../components/select/option";
import { dateOptions } from "./date-options";
import PrevSelect from "../../components/global-filter/previous-select";
import useData from "../../hooks/useStore";
import DatePickers from "./date-pickers";

const DateControls = () => {
  const { filterState } = useData().sharedReducer;

  const showPickers = filterState.find((f) => f.value === "Custom");
  const label =
    filterState.find((f) => f.id === "Date Select")?.value || "Date Select";
  console.log(
    "label",
    filterState.find((f) => f.id === "Date Select")?.value || "Date Select"
  );

  return <>{!!showPickers && <DatePickers />}</>;
};

export default DateControls;
