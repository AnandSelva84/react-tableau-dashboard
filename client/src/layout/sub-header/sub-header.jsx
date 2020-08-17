import React, { useState } from "react";
import { Paper, Chip } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import { deleteFilter, toggleDrawer } from "../../redux/actions/shared";
import theme from "../../theme/layout";
import "./sub-header.css";
import ChipsWrapper from "./chip-wrapper-dialog";
import ClickableIcon from "../../components/icon-button";
import ShowGroup from "../../pages/level-3/button-group";
import { useLocation } from "react-router-dom";

const SubHeader = () => {
  const {
    filterState,
    appliedFilters,
    newFilters,
    showReport,
    appliedTimeIntervals,
  } = useData().sharedReducer;

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const createChip = (id, value) => `${id} : ${value}`;
  const isVisiable = filterState.length > 0;
  const [showDialog, setShowDialog] = useState(false);
  const [chosenDialog, seChosentShowDialog] = useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const timeIntervalFilter = appliedTimeIntervals.find(
    (f) => f.filter_id === "DateInterval"
  );

  const appliedIds = appliedFilters.map((filter) => filter.ID) || [];

  const handleTextChange = (e) => {
    const value = e?.target?.value || "";
    setSearchValue(value);
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

  const wrapChips = () => {
    if (newFilters.length === 0) return [];
    const reFormattedApplied = appliedFilters.map((f) => ({
      ...f,
      applied: true,
    }));
    let chipsArray = [];
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

  const handleClick = (id, value, lvl, ID) => {
    dispatch(deleteFilter({ id, value, lvl, ID, fromHeader: true }));
  };

  const isApplied = () => {
    return "#192734";
  };

  const isClickable = (value) => {
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
    let arr = array.filter((a) => a.id !== "Time Interval");
    let element = array.find((a) => a.id === "Time Interval");
    arr.push(element);
    return arr;
  };

  if (pathname === "/") return null;

  return (
    <div>
      {isVisiable && !!newFilters && newFilters.length > 0 && (
        <Paper>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
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
                  size="small"
                  label={createChip(filter.id, filter.value)}
                  style={{
                    marginRight: "0.4rem",
                    // backgroundColor: colors.usaa_blue,
                  }}
                  onClick={() => {
                    handleOpen(filter.value, filter.id);
                    getStatus(filter.filter_id);
                  }}
                />
              ))}
              {!!timeIntervalFilter && (
                <Chip
                  size="small"
                  label={createChip(
                    "Date Interval",
                    timeIntervalFilter?.filter_display_text
                  )}
                />
              )}
            </div>
            <div className="">{showReport && <ShowGroup />}</div>
          </div>
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
