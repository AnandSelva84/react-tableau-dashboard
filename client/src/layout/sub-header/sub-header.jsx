import React, { useState } from "react";
import {
  Paper,
  Chip,
  createStyles,
  makeStyles,
  TextField,
  ChipProps,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import {
  addFilter,
  deleteFilter,
  applyFilters,
  toggleDrawer,
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
import { colors } from "../../constants/colors";
import ClickableIcon from "../../components/icon-button";

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
          <>
            <ClickableIcon
              icon={<Menu />}
              onClick={() => {
                dispatch(toggleDrawer());
              }}
              style={{ marginRight: "1rem" }}
            />
          </>
          {reOrder(wrapChips().sort(sortOptions)).map((filter) => (
            <Chip
              label={createChip(filter.id, filter.value)}
              style={{
                marginRight: "0.4rem",
                // backgroundColor: colors.usaa_blue,
                marginTop: "0.2rem",
              }}
              onClick={() => {
                handleOpen(filter.value, filter.id);
                getStatus(filter.filter_id);
              }}
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
