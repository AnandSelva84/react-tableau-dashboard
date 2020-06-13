import React from "react";
import Button from "../button/button";
import btnsTheme from "../../theme/btn-control";
import { useDispatch } from "react-redux";
import {
  saveFilters,
  clearFilter,
  applyFilters,
  editFilterState,
} from "../../redux/actions/shared";
import useData from "../../hooks/useStore";

const ControlButtons = () => {
  const dispatch = useDispatch();
  const { filterState, unCompleted } = useData().sharedReducer;

  const handleSave = () => {
    dispatch(saveFilters(filterState));
  };
  const handleClear = () => {
    dispatch(clearFilter());
  };
  const handleApply = () => {
    console.log("filters applied ");
    const filterStateAfterApply = [
      ...filterState.map((f) => ({
        ...f,
        applied: true,
      })),
    ];

    if (!!unCompleted.length) {
      alert(`${unCompleted} are empty, please check atleast one option.`);
      return;
    }

    dispatch(editFilterState(filterStateAfterApply));
    dispatch(applyFilters([...filterStateAfterApply]));
  };

  return (
    <>
      <Button
        title="Apply Filters"
        style={{ ...btnsTheme.apply }}
        onClick={handleApply}
      />
      <Button
        title=" Save Filters"
        style={{ ...btnsTheme.save }}
        onClick={handleSave}
      />
      <Button
        title="Reset Filters"
        style={{ ...btnsTheme.cancel }}
        onClick={handleClear}
      />
    </>
  );
};

export default ControlButtons;
