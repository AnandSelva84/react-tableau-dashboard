import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Paper,
  TextField,
  ClickAwayListener,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import {
  addFilter,
  deleteFilter,
  editFilterState,
  setAllAreSelected,
  setAllCheckArray,
  setStoredViewdFilters,
  setUncompletedFilters,
  toggleResetButton,
} from "../../redux/actions/shared";
import { isExist } from "../../redux/methods/is-exist";
import { filterModel } from "../../models/filter";
import Option from "../select/option";
import CustomSelect from "../custom-auto-complete/custom-auto-complete";

//props.values should be filtered before passing it to it's component
const PrevSelect = (props) => {
  const {
    filterOptionId,
    filter_display_text,
    filter_value_text,
  } = filterModel.values[0];

  const dispatch = useDispatch();

  const {
    filters,
    filterState,
    newFilters,
    allCheckArray,
    storedViewedFilters,
    appliedFilters,
    resetState,
  } = useData().sharedReducer;

  const fullStateStandardIds = storedViewedFilters.map((f) => f.id);

  const [searchValue, setSearchValue] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [checkedArray, setcheCheckedArray] = useState([]);
  const [unCompletedFilters, setUncompleted] = useState([]);
  const [allCheck, setAllCheck] = useState(false);

  const values = props.values.map((value) => ({ ...value, lvl: props.lvl }));
  const [localFilters, setLocalFilters] = useState(props.values);
  const chosenIds = filterState.map((filter) => filter.ID) || [];
  const chosenLvls = filterState.map((filter) => filter.lvl) || [];

  const possibleAllSelect = filterState.filter(
    (filter) => filter.id !== props.title
  );
  // .filter((f) => f.lvl < props.lvl);

  React.useEffect(() => {
    if (!!!props.values.length) setAllCheck(false);
  }, [props.values]);

  React.useEffect(() => {
    if (loaded) {
      selectAll();
      dispatch(toggleResetButton());
    }
  }, [resetState]);

  const newState = [
    ...props.values.map((value) => ({
      id: props.title,
      ID: value.filterOptionId,
      lvl: props.lvl,
      parentId: value.parentFilterOptionId,
      value: value.filter_value_text,
      filter_id: props.id,
    })),
    ...possibleAllSelect,
  ];

  const validate = () => {
    return !!unCompletedFilters.length;
  };

  React.useEffect(() => {
    props.onValuesChanged(props.values, props.id);
  }, [filterState]);

  React.useEffect(() => {
    setLoaded(true);
    if (!props.custom) selectAll();
    return () => {
      dispatch(
        setAllCheckArray([...allCheckArray.filter((f) => f !== props.title)])
      );
    };
  }, []);

  React.useEffect(() => {
    let editedValues = storedViewedFilters.find((f) => f.id === props.id);
    if (!!editedValues) {
      editedValues.valuesLength = props.values.length;
      const storedAfterChange = [
        ...storedViewedFilters.filter((f) => f.id !== props.id),
        editedValues,
      ];
      console.log("edit Values ", storedAfterChange);
      dispatch(setStoredViewdFilters([...storedAfterChange]));
    }
  }, [filterState]);

  const handlechange = (e) => {
    setSearchValue(e.target.value);
  };

  const hasParentTest = (parentId) => {
    let hasId = chosenIds.find((id) => id === parentId);
    if (hasId === 0) hasId = 1;
    return !!hasId;
  };

  const handleClick = (ParentName, value, lvl, ID, parentId, filter_id) => {
    if (props.custom) {
      dispatch(
        editFilterState([
          ...filterState.filter((f) => f.id !== ParentName),
          { id: ParentName, value, lvl, ID, parentId, filter_id },
        ])
      );
      return;
    }
    const id = ParentName;
    // validate();

    if (lvl === 0 && isExist(filterState, id, value, ID)) return;
    !isExist(filterState, id, value, ID)
      ? dispatch(addFilter({ id, value, lvl, ID, parentId, filter_id }))
      : dispatch(deleteFilter({ id, value, lvl, ID, parentId, filter_id }));
  };

  function sortOptions(a, b) {
    if (a.order < b.order) {
      return 1;
    }
    if (a.order > b.orde) {
      return -1;
    }
    return 0;
  }

  React.useEffect(() => {
    // debugger;
    let unCompletedFilters = [];
    fullStateStandardIds.forEach((id) => {
      if (!!!filterState.find((f) => f.filter_id === id)) {
        console.log("not available", id);
        unCompletedFilters.push(
          newFilters.find((f) => f.filter_id === id)?.title
        );
      }
    });
    setUncompleted([...unCompletedFilters]);
  }, [filterState]);

  React.useEffect(() => {
    console.log("uncompleted", unCompletedFilters);
    dispatch(setUncompletedFilters([...unCompletedFilters]));
  }, [unCompletedFilters]);

  React.useEffect(() => {
    if (!!!props.values.length && !cleared) {
      dispatch(
        editFilterState(filterState.filter((f) => f.filter_id !== props.id))
      );
      setCleared(true);
    }
    if (!!props.values.length) {
      setCleared(false);
    }
  }, [filterState]);

  const getOptions = () => {
    const options = props.values.filter(
      (value) => hasParentTest(value.parentFilterOptionId) || props.lvl === 0
    );
    return options;
  };

  const getAllPossibleFilters = () => {
    // const rawPossible =
    //   newFilters.filter((filter) => filter.title === parentTitle)[0]?.values ||
    //   [];
    const parentTitle = getTitle();

    const possible = getOptions().map((option) => ({
      id: parentTitle,
      ID: option.filterOptionId,
      lvl: props.lvl,
      parentId: option.parentFilterOptionId,
      value: option.filter_value_text,
    }));

    return possible;
  };

  const isAllExisted = () => {
    const toCompare = getAllPossibleFilters();
    const existanceLength =
      filterState.filter((value) => value.id === getTitle())?.length || 0;
    const existance =
      existanceLength === toCompare.length && toCompare.length !== 0;
    // dispatch(setAllAreSelected({ title: getTitle(), hasAll: existance }));

    return existance;
  };

  const selectAll = () => {
    setShowMenu(false);
    // setAllCheck(true);
    dispatch(editFilterState([...newState]));
  };

  const unSelectAll = () => {
    setShowMenu(false);
    // setAllCheck(false);

    dispatch(editFilterState([...possibleAllSelect]));
  };

  const handleSelectAll = () => {
    const AllChecked = isAllExisted();
    const currentSelected = filterState.filter(
      (filter) => filter.id !== getTitle()
    );
    if (allCheck) {
      unSelectAll();
    } else {
      selectAll();
    }
  };

  const getTitle = () => {
    return props.title;
  };

  const [showMenu, setShowMenu] = useState(false);

  const isExistinArray = (array, element) => {
    return array.includes(element);
  };

  const handleOptionChange = (checkState, id, parentId) => {
    if (
      isExistinArray(
        checkedArray.map((c) => c.id),
        id
      ) &&
      !checkState
    ) {
      setcheCheckedArray([...checkedArray.filter((c) => c.id !== id)]);
    } else if (
      !isExistinArray(
        checkedArray.map((c) => c.id),
        id
      ) &&
      checkState
    ) {
      setcheCheckedArray([...checkedArray, { id, checkState, parentId }]);
    }
  };

  React.useEffect(() => {
    const f = filterState.filter((filter) => filter.id === props.title).length;
    if (f === props.values.length) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [checkedArray]);

  React.useEffect(() => {
    if (allCheck && loaded) {
      dispatch(setAllCheckArray([...allCheckArray, props.title]));
    }
    if (!allCheck && loaded) {
      dispatch(
        setAllCheckArray([...allCheckArray.filter((f) => f !== props.title)])
      );
    }
  }, [allCheck]);

  React.useEffect(() => {
    console.log("allCheckArray", allCheckArray);
    if (allCheckArray.length === props.maxLength) {
    }
  }, [allCheckArray]);

  React.useEffect(() => {}, [allCheck]);

  const handleOpen = () => {
    setShowMenu(true);
  };

  const hanldeClose = () => {
    setShowMenu(false);
  };

  const toggle = () => {
    showMenu ? hanldeClose() : handleOpen();
  };

  const getOptionsAfterSearch = () => {
    if (!!searchValue) {
      return getOptions().filter((option) =>
        option.filter_display_text.toLowerCase().includes(searchValue)
      );
    } else {
      return getOptions();
    }
  };
  if (props.lvl !== 0 || props.custom) {
    return (
      <ClickAwayListener onClickAway={hanldeClose}>
        <div style={{ position: "relative", paddingTop: "1rem" }}>
          <TextField
            onClick={toggle}
            fullWidth
            variant="outlined"
            onChange={handlechange}
            placeholder={!props.custom ? props?.title : props.placeholder}
            label={props?.title || "Unkown"}
          />
          {showMenu && (
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxHeight: "15rem",
                overflowY: "auto",
                position: "absolute",
                top: "4.5rem",
                minWidth: "100%",
                zIndex: "100",
              }}
            >
              {props.lvl !== 0 && (
                <Option
                  checked={allCheck}
                  filterState={filterState}
                  onClick={() => {
                    // handleSelectAll();
                    handleSelectAll();
                  }}
                  display={`All\t (${props.values?.length || 0})`}
                  onChange={() => {}}
                />
              )}
              {getOptionsAfterSearch()
                .sort(sortOptions)
                .map((option) => (
                  <Option
                    onChange={handleOptionChange}
                    checked={isExist(
                      filterState,
                      getTitle(),
                      option.filter_value_text
                    )}
                    value={option.filter_value_text}
                    filterState={filterState}
                    id={option.filterOptionId}
                    parentId={option.parentFilterOptionId}
                    lvl={props.lvl}
                    display={option.filter_display_text}
                    onClick={() =>
                      handleClick(
                        getTitle(),
                        option.filter_value_text,
                        props.lvl,
                        option.filterOptionId,
                        option.parentFilterOptionId,
                        props.id
                      )
                    }
                  />
                ))}
            </Paper>
          )}
        </div>
      </ClickAwayListener>
    );
  } else {
    return null;
  }
};
export default PrevSelect;
