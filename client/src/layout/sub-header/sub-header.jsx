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
  const [showDialog, setShowDialog] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [chosenDialog, seChosentShowDialog] = useState("");
  const [initialApplied, setInitialApplied] = useState([...appliedFilters]);
  const [searchValue, setSearchValue] = React.useState("");

  const chosenIds = filterState.map((filter) => filter.ID) || [];
  const appliedIds = appliedFilters.map((filter) => filter.ID) || [];

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    setInitialApplied([...appliedFilters]);
  }, [appliedFilters]);

  React.useEffect(() => {
    // if (loaded) dispatch(applyFilters([]));
  }, [currentMainFilter]);

  const handleTextChange = (e) => {
    const value = e?.target?.value || "";
    setSearchValue(value);
  };

  const addFilter = (id, value, lvl, ID, parentId) => {
    dispatch(addFilter({ id, value, lvl, ID, parentId }));
  };

  const currentLength = (filter_Id) => {
    return (
      storedViewedFilters.find((f) => f.id === filter_Id)?.valuesLength || 0
    );
  };

  const isMultible = (chipsForIdValues, filter_Id) => {
    if (!!filter_Id) getAllPossibleValues(filter_Id);
    const currentValuesLength = currentLength(filter_Id);
    console.log("currentValuesLength", currentValuesLength);

    if (chipsForIdValues.length === currentValuesLength) return "All";
    return chipsForIdValues.length > 1
      ? "Multiple"
      : chipsForIdValues[0]?.value;
  };

  const wrapChips = () => {
    if (newFilters.length === 0) return [];
    const reFormattedApplied = appliedFilters.map((f) => ({
      ...f,
      applied: true,
    }));
    let chipsArray = [];
    let onlyApplied = filterState.filter((f) => f.applied);
    reFormattedApplied.forEach((filter) => {
      const chipsForId = appliedFilters.filter((f) => f.id === filter.id);
      const chipsForIdValues = chipsForId.map((c) => ({
        value: c.value,
        ID: c.ID,
      }));

      if (!chipsArray.map((c) => c.id).includes(filter.id))
        chipsArray.push({
          id: filter.id,
          values: chipsForIdValues,
          value: getStatus(filter.filter_id),
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
    return "#192734";
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
    setSearchValue("");
    setShowDialog(false);
  };

  const getChosenValues = (id) => {
    if (newFilters.length === 0) return [];
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

  React.useEffect(() => {
    return () => {
      setSearchValue("");
    };
  }, []);

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

  const getAllPossibleValues = (filter_id) => {
    const rawFilter = newFilters.find((f) => f.filter_id === filter_id);
    const rawValues =
      rawFilter?.values.filter((value) =>
        appliedIds.includes(value?.parent_filter_option)
      ) || [];
    return rawValues;
  };
  const getStatus = (filter_id) => {
    let status = "";
    const rawValues = getAllPossibleValues(filter_id);
    const appliedValues = appliedFilters.filter(
      (f) => f.filter_id === filter_id
    );
    if (appliedValues?.length === rawValues?.length) status = "All";
    if (appliedValues?.length !== rawValues?.length) status = "Multiple";
    if (appliedValues?.length === 1) status = appliedValues[0]?.value || "";
    return status;
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
      {isVisiable && !!newFilters && newFilters.length > 0 && (
        <Paper
          style={{
            ...theme.subHeader,
          }}
        >
          {reOrder(wrapChips().sort(sortOptions)).map((filter) => (
            <Chip
              label={createChip(filter.id, filter.value)}
              color={"primary"}
              style={{
                marginRight: "0.4rem",
                //TODO make isApplied functional for mulitble and single values
                backgroundColor: "#192734",
                marginTop: "0.2rem",
              }}
              onClick={() => {
                handleOpen(filter.value, filter.id);
                getStatus(filter.filter_id);
                // getAllPossibleValues(filter.filter_id);
              }}
              // onDelete={() => {
              //   if (!!filter.lvl)
              //     handleClick(filter.id, filter.value, filter.lvl, true);
              // }}
            />
          ))}
        </Paper>
      )}
      <ChipsWrapper
        appliedFilters={appliedFilters}
        handleTextChange={handleTextChange}
        searchValue={searchValue}
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
