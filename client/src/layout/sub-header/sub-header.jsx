import React, { useState } from "react";
import {
  Paper,
  Chip,
  createStyles,
  makeStyles,
  TextField,
  ChipProps,
} from "@material-ui/core";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import { addFilter, deleteFilter } from "../../redux/actions/shared";
import { isExist } from "../../redux/methods/is-exist";
import theme from "../../theme/layout";
import "./sub-header.css";
import { Select } from "../../components/auto-complete-select/auto-complete-select";
import {
  reFormat,
  getPossibleChoicesToFill,
} from "../../redux/methods/re-format-response";
import ChipsWrapper from "./chip-wrapper-dialog";

const SubHeader = () => {
  const {
    filters,
    filterState,
    appliedFilters,
    newFilters,
    storedViewedFilters,
  } = useData().sharedReducer;
  const dispatch = useDispatch();
  const createChip = (id, value) => `${id} : ${value}`;
  const isVisiable = filterState.length > 0;
  const [ids, setIds] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [chosenDialog, seChosentShowDialog] = useState("");

  const chosenIds = filterState.map((filter) => filter.ID) || [];

  const addFilter = (id, value, lvl, ID, parentId) => {
    dispatch(addFilter({ id, value, lvl, ID, parentId }));
  };

  const currentLength = (filter_Id) => {
    return (
      storedViewedFilters.find((f) => f.id === filter_Id)?.valuesLength || 0
    );
  };

  const isMultible = (chipsForIdValues, filter_Id) => {
    const currentValuesLength = currentLength(filter_Id);
    console.log("currentValuesLength", currentValuesLength);

    if (chipsForIdValues.length === currentValuesLength) return "All";
    return chipsForIdValues.length > 1 ? "Multiple" : chipsForIdValues[0].value;
  };

  const wrapChips = () => {
    let chipsArray = [];
    filterState.forEach((filter) => {
      const chipsForId = filterState.filter((f) => f.id === filter.id);
      const chipsForIdValues = chipsForId.map((c) => ({
        value: c.value,
        ID: c.ID,
      }));
      if (!chipsArray.map((c) => c.id).includes(filter.id))
        chipsArray.push({
          id: filter.id,
          values: chipsForIdValues,
          value: isMultible(chipsForIdValues, filter.filter_id),
          lvl: filter.lvl,
          filter_id: filter.filter_id,
        });
    });
    return chipsArray;
  };

  React.useEffect(() => {
    console.log("wrapChips", wrapChips());
  }, [filterState]);

  const handleClick = (id, value, lvl) => {
    dispatch(deleteFilter({ id, value, lvl }));
  };

  const isApplied = (ID) => {
    const color = !!appliedFilters.find((filter) => filter.ID === ID)
      ? "#192734"
      : "";
    return color;
  };

  const isClickable = (value, id) => {
    return value === "Multiple" || value === "All";
  };

  const handleOpen = (value, id) => {
    if (isClickable(value)) {
      setShowDialog(true);
      seChosentShowDialog(id);
    }
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const getChosenValues = (id) => {
    return wrapChips().find((f) => f.id === id)?.values || [];
  };

  const getLvl = (id) => {
    return filterState.find((f) => f.id === id)?.lvl || 0;
  };

  function sortOptions(a, b) {
    if (a.lvl < b.lvl) {
      return -1;
    }
    if (a.lvl > b.lvl) {
      return 1;
    }
    return 0;
  }

  const reOrder = (array) => {
    if (!array.map((a) => a.id).includes("Time Interval")) return array;
    let arr = array.filter((a, index) => a.id !== "Time Interval");
    let element = array.find((a, index) => a.id === "Time Interval");
    arr.push(element);
    return arr;
  };

  const isAllApplied = (filter_id) => {
    const chosen = filterState.filter((f) => f.filter_id === filter_id);
    const appliedValues = chosen.map((c) => c?.applied || false);
    return appliedValues.every((c) => c === true) ? "#192734" : "";
  };

  return (
    <div>
      {isVisiable && (
        <Paper
          style={{
            ...theme.subHeader,
          }}
        >
          {reOrder(wrapChips().sort(sortOptions)).map((filter) => (
            <Chip
              label={createChip(filter.id, filter.value)}
              color={!!isAllApplied(filter.filter_id) ? "primary" : ""}
              style={{
                marginRight: "0.4rem",
                //TODO make isApplied functional for mulitble and single values
                backgroundColor: isAllApplied(filter.filter_id),
                // color: !!isApplied(filter.ID) ? "white" : "",
                marginTop: "0.2rem",
                // cursor: isClickable(filter.value),
              }}
              onClick={() => handleOpen(filter.value, filter.id)}
              onDelete={() => {
                if (!!filter.lvl)
                  handleClick(filter.id, filter.value, filter.lvl);
              }}
            />
          ))}
        </Paper>
      )}
      <ChipsWrapper
        open={showDialog}
        onClose={handleClose}
        filterState={filterState}
        title={chosenDialog}
        isApplied={(ID) => {
          isApplied(ID);
        }}
        values={getChosenValues(chosenDialog)}
        lvl={getLvl(chosenDialog)}
        onDelete={(id, value, lvl) => {
          handleClick(id, value, lvl);
        }}
      />
    </div>
  );
};

export default SubHeader;
