import React from "react";
import Button from "../button/button";
import btnsTheme from "../../theme/btn-control";
import { useDispatch } from "react-redux";
import {
  saveFilters,
  clearFilter,
  applyFilters,
  editFilterState,
  toggleResetButton,
  setStoredViewdFilters,
  addFilter,
  showMessage,
  toggleDrawer,
} from "../../redux/actions/shared";
import useData from "../../hooks/useStore";
// import { useSnackbar } from "notistack";
import { applyTimeFilterState } from "./../../redux/actions/shared";

const ControlButtons = () => {
  // const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const {
    filterState,
    unCompleted,
    currentMainFilter,
    timeFilterState,
  } = useData().sharedReducer;
  const [error, setError] = React.useState("");
  const hasCustomRange = timeFilterState.find(
    (f) => f.value === "Custom_Range"
  );
  const startDate = timeFilterState.find((f) => f.filter_type === "Range Start")
    ?.value;
  const endDate = timeFilterState.find((f) => f.filter_type === "Range End")
    ?.value;

  const handleStoreUpdate = (name) => {
    dispatch(
      addFilter({
        id: "Hierarchies",
        value: name,
        lvl: 0,
        ID: name,
        parentId: null,
        filter_id: null,
        applied: true,
      })
    );
  };

  React.useEffect(() => {
    if (unCompleted.length)
      setError(`${unCompleted} are empty, Please select at least one option.`);
    else if (!!!unCompleted.length && !!!error) setError("");
  }, [unCompleted]);

  React.useEffect(() => {
    if (hasCustomRange && timeFilterState.length < 3) {
      setError(
        "Time Interval has Custom Range, Please select the Start Date and End Date."
      );
      return;
    } else if (!hasCustomRange) setError("");

    if (!!!startDate && !!!endDate) return;

    const validDate = areValidDates(startDate, endDate);
    if (!validDate) setError("End Date should be greater than Start Date.");
    else setError("");
  }, [timeFilterState]);

  const makeMessage = (msg, variant) => {
    // variant could be success, error, warning, info, or default
    // enqueueSnackbar(msg, { variant });
    dispatch(showMessage(msg, variant, true));
  };

  const areValidDates = (start, end) => {
    const startDate = Date.parse(start);
    const endDate = Date.parse(end);
    return endDate > startDate;
  };

  const handleSave = () => {
    if (!!error) {
      makeMessage(error, "error");
      return;
    } else {
      makeMessage(`Filters Saved Successfully.`, "success");
    }
    dispatch(toggleDrawer());
    dispatch(saveFilters([...filterState]));
    dispatch(applyFilters([...filterState]));
  };
  const handleClear = () => {
    dispatch(setStoredViewdFilters([]));
    handleStoreUpdate(currentMainFilter);
    makeMessage(`Filters Reset Successfully.`, "info");
    dispatch(toggleResetButton());
  };
  const handleApply = () => {
    if (!!error) {
      makeMessage(error, "error");
      return;
    }
    if (!!unCompleted.length) {
      makeMessage(error, "error");
      return;
    }
    if (!!!error) {
      makeMessage(`Filters Applied Successfully.`, "success");
    }

    const filterStateAfterApply = [
      ...filterState.map((f) => ({
        ...f,
        applied: true,
      })),
    ];

    dispatch(applyTimeFilterState([...timeFilterState]));
    dispatch(toggleDrawer());
    dispatch(editFilterState(filterStateAfterApply));
    dispatch(applyFilters([...filterStateAfterApply]));
  };

  return (
    <>
      <Button
        title="Apply Filters"
        style={{ ...btnsTheme.apply, textTransform: "none" }}
        onClick={handleApply}
      />
      <Button
        title="Save As Default"
        style={{ ...btnsTheme.save, textTransform: "none" }}
        onClick={handleSave}
      />
      <Button
        title="Restore Default"
        style={{ ...btnsTheme.cancel, textTransform: "none" }}
        onClick={handleClear}
      />
    </>
  );
};

export default ControlButtons;
