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
  } = useData().sharedReducer;
  const [error, setError] = React.useState("");

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
      setError(`${unCompleted} are empty, please don'\t leave empty options.`);
    else setError("");
  }, [unCompleted]);

  const showMessage = (msg, variant) => {
    // variant could be success, error, warning, info, or default
    // enqueueSnackbar(msg, { variant });
  };

  const isNotValid = () => {
    return !!unCompleted.length;
  };

  const handleSave = () => {
    if (!!unCompleted.length) {
      showMessage(error, "error");
      return;
    } else {
      showMessage(`filters saved successfully.`, "success");
    }

    dispatch(saveFilters(filterState));
  };
  const handleClear = () => {
    // dispatch(clearFilter());
    showMessage(`filters are reseted.`, "info");
    dispatch(setStoredViewdFilters([]));
    handleStoreUpdate(currentMainFilter);

    // props.onSwitch();
    // const newName = currentMainFilter === "Legacy" ? "Business" : "Legacy";
    // handleStoreUpdate(newName);

    dispatch(toggleResetButton());
  };
  const handleApply = () => {
    if (!!unCompleted.length) {
      showMessage(error, "error");
      return;
    } else {
      showMessage(`filters applied successfully.`, "success");
    }

    const filterStateAfterApply = [
      ...filterState.map((f) => ({
        ...f,
        applied: true,
      })),
    ];

    // if (!!unCompleted.length) {
    //   alert(`${unCompleted} are empty, please check atleast one option.`);
    //   return;
    // }

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
