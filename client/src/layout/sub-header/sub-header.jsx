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
import {
  addFilter,
  deleteFilter,
  applyFilters,
} from "../../redux/actions/shared";
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
    currentMainFilter,
    drawer,
  } = useData().sharedReducer;
  const dispatch = useDispatch();
  const createChip = (id, value) => `${id} : ${value}`;
  const isVisiable = filterState.length > 0;
  const [ids, setIds] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [chosenDialog, seChosentShowDialog] = useState("");
  const [initialApplied, setInitialApplied] = useState([...appliedFilters]);

  const chosenIds = filterState.map((filter) => filter.ID) || [];

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    drawer && setInitialApplied([...appliedFilters]);
  }, [appliedFilters]);

  React.useEffect(() => {
    if (loaded) dispatch(applyFilters([]));
  }, [currentMainFilter]);

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
    return chipsForIdValues.length > 1
      ? "Multiple"
      : chipsForIdValues[0]?.value;
  };

  const wrapChips = () => {
    const reFormattedApplied = initialApplied.map((f) => ({
      ...f,
      applied: true,
    }));
    let chipsArray = [];
    let onlyApplied = filterState.filter((f) => f.applied);
    reFormattedApplied.forEach((filter) => {
      const chipsForId = initialApplied.filter((f) => f.id === filter.id);
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

  const handleClick = (id, value, lvl, ID, deleteAll) => {
    dispatch(deleteFilter({ id, value, lvl, ID, fromHeader: true }));
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
    const chosen = initialApplied.filter((f) => f.filter_id === filter_id);
    const appliedValues = chosen.map((c) => c?.applied || false);
    return appliedValues.every((c) => c === true) ? "#192734" : "";
  };

  React.useEffect(() => {
    console.log("values has changed chosen", chosenIds);
    console.log(
      "values has changed parentIds in filterState",
      filterState.map((f) => f.parentId)
    );
    const parents = filterState.map((f) => f.parentId);

    console.log(
      "values has changed parentIds in after filter",
      filterState.filter(
        (f) => chosenIds.includes(f.parentId) || f.parentId === null
      )
    );
    console.log("values has changed length", storedViewedFilters.length);
    // if (!drawer && storedViewedFilters.length === 4) {
    //   dispatch(
    //     applyFilters([
    //       ...filterState.filter(
    //         (f) => chosenIds.includes(f.parentId) || f.parentId === null
    //       ),
    //     ])
    //   );
    // }
    // dispatch(editFilterState())
  }, [filterState]);

  React.useEffect(() => {
    filterState.forEach((elem) => {
      if (!chosenIds.includes(elem.parentId)) {
        console.log("this element isnt in state", elem);
      }
    });
  }, [filterState]);

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
                  handleClick(filter.id, filter.value, filter.lvl, true);
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
        onDelete={(id, value, lvl, ID) => {
          handleClick(id, value, lvl, ID, false);
        }}
      />
    </div>
  );
};

export default SubHeader;
