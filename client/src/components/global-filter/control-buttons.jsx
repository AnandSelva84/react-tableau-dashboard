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
    console.log({ specError: error });
  }, [error]);

  React.useEffect(() => {
    if (unCompleted.length)
      setError(`${unCompleted} are empty, Please select at least one option.`);
    else if (!!!unCompleted.length && !!!error) setError("");
  }, [unCompleted]);

  const makeMessage = (msg, variant) => {
    // variant could be success, error, warning, info, or default
    // enqueueSnackbar(msg, { variant });
    dispatch(showMessage(msg, variant, true));
  };

  const isNotValid = () => {
    return !!unCompleted.length;
  };

  const areValidDates = (start, end) => {
    const startDate = Date.parse(start);
    const endDate = Date.parse(end);
    return endDate > startDate;
  };

  const validateTimeFilters = () => {
    debugger;

    if (timeFilterState.length === 0) return;
    if (hasCustomRange && timeFilterState.length < 3) {
      setError(
        "time interval has custom range, please specify the start, end date."
      );
      return;
    }
    const startDate = timeFilterState.find(
      (f) => f.filter_type === "Range Start"
    );
    const endDate = timeFilterState.find((f) => f.filter_type === "Range End");

    const validDate = areValidDates(startDate, endDate);
    if (!validDate) setError("end date should be after start date.");
  };

  const handleSave = () => {
    if (!!unCompleted.length) {
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
    debugger;
    validateTimeFilters();
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
