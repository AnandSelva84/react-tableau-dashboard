import React from "react";
import Button from "../button/button";
import btnsTheme from "../../theme/btn-control";
import { useDispatch } from "react-redux";
import { saveFilters, clearFilter } from "../../redux/actions/shared";
import useData from "../../hooks/useStore";

const ControlButtons = () => {
  const dispatch = useDispatch();
  const { filterState } = useData().sharedReducer;

  const handleSave = () => {
    dispatch(saveFilters(filterState));
  };
  const handleClear = () => {
    dispatch(clearFilter());
  };

  return (
    <>
      <Button title="Apply Filters" style={{ ...btnsTheme.apply }} />
      <Button
        title=" Save Filters"
        style={{ ...btnsTheme.save }}
        onClick={handleSave}
      />
      <Button
        title="Clear Filters"
        style={{ ...btnsTheme.cancel }}
        onClick={handleClear}
      />
    </>
  );
};

export default ControlButtons;
