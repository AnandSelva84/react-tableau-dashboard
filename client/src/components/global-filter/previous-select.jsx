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
// import { isExist } from "../../redux/methods/is-exist";
import { filterModel } from "../../models/filter";
import Option from "../select/option";
import CustomSelect from "../custom-auto-complete/custom-auto-complete";
import MenuSkeleton from "../menu-skeletons/menu-skeletons";
import OptionsWrapper from "./optionsWrapper";

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
    currentMainFilter,
    savedFilters,
  } = useData().sharedReducer;

  const fullStateStandardIds = storedViewedFilters.map((f) => f.id);

  const [searchValue, setSearchValue] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [checkedArray, setcheCheckedArray] = useState([]);
  const [unCompletedFilters, setUncompleted] = useState([]);
  const [allCheck, setAllCheck] = useState(false);
  const [valuesUpdated, setValuesUpdated] = useState(false);

  const chosenIds = filterState.map((filter) => filter.ID) || [];
  const mainApplied = appliedFilters.find((f) => f.id === "Hierarchies")?.value;
  const possibleAllSelect = filterState.filter(
    (filter) => filter.id !== props.title
  );
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

  const findFamily = (ID, data) => {
    let family = [];
    let searchID = [ID];

    //starting lvl is 0 end is 4
    while (1) {
      const child = data.filter((f) => searchID.includes(f.parentId));
      if (child.length === 0) break;
      family = [...family, ...child];
      searchID = child.map((f) => f.ID);
    }
    console.log("all new family", family);
    return family;
  };

  // .filter((f) => f.lvl < props.lvl);

  // React.useEffect(() => {
  //   debugger;
  //   if (mainApplied === currentMainFilter)
  //     dispatch(editFilterState([...appliedFilters]));
  // }, [currentMainFilter]);

  React.useEffect(() => {
    if (!!!props.values.length) setAllCheck(false);
  }, [props.values]);

  const isExist = (ID) => {
    return filterState.find((f) => f.ID === ID);
  };

  React.useEffect(() => {
    if (props.custom) return;
    if (loaded) {
      if (!!savedFilters && savedFilters.length > 2)
        dispatch(editFilterState([...savedFilters]));

      dispatch(editFilterState([...newState]));
      dispatch(toggleResetButton());
    }
  }, [resetState]);

  const getFullState = () => {
    const fullState = [
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
    let full = currentMainFilter === mainApplied ? appliedFilters : fullState;
    if (appliedFilters.length < 2 && currentMainFilter === mainApplied)
      full = fullState;

    return full;
  };

  const onClickAll = () => {
    const initialFullState = [
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
    dispatch(editFilterState([...initialFullState]));
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

  const handleAddFilter = (id, value, lvl, ID, parentId, filter_id) => {
    dispatch(addFilter({ id, value, lvl, ID, parentId, filter_id }));

    dispatch(
      editFilterState([
        ...filterState,
        { id, value, lvl, ID, parentId, filter_id },
        ...findFamily(ID, props.reformattedNewFilters),
      ])
    );
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

    if (lvl === 0 && isExist(ID)) return;
    !isExist(ID)
      ? handleAddFilter(id, value, lvl, ID, parentId, filter_id)
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
    console.log("menuLoading", menuLoading);
  }, [menuLoading]);

  React.useEffect(() => {
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

  const selectAll = () => {
    // setShowMenu(false);
    // setAllCheck(true);
    dispatch(editFilterState([...getFullState()]));
  };

  const unSelectAll = () => {
    // setShowMenu(false);
    // setAllCheck(false);
    dispatch(editFilterState([...possibleAllSelect]));
  };

  const handleSelectAll = () => {
    if (allCheck) {
      unSelectAll();
    } else {
      onClickAll();
    }
  };

  const getTitle = () => {
    return props.title;
  };

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
    if (!newAllChecked()) setAllCheck(false);
  }, [filterState]);

  const newAllChecked = () => {
    const allOptionsIds = props.values.map((v) => v.filterOptionId);
    const allExistInState = allOptionsIds.every((v) => chosenIds.includes(v));
    return allExistInState;
  };

  const handleOpen = () => {
    setShowMenu(true);
  };

  const hanldeClose = () => {
    setShowMenu(false);
  };

  const toggle = () => {
    setMenuLoading(true);
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
            <OptionsWrapper
              onMenuHasLoaded={() => {
                setTimeout(() => {
                  setMenuLoading(false);
                }, 100);
              }}
            >
              {!menuLoading ? (
                <>
                  <>
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
                        // onMenuHasLoaded = {()=>{}}
                      />
                    )}
                  </>
                  <>
                    {getOptionsAfterSearch()
                      .sort(sortOptions)
                      .map((option) => (
                        <Option
                          onChange={handleOptionChange}
                          checked={isExist(option.filterOptionId)}
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
                  </>
                </>
              ) : (
                <MenuSkeleton />
              )}{" "}
            </OptionsWrapper>
          )}
        </div>
      </ClickAwayListener>
    );
  } else {
    return null;
  }
};
export default PrevSelect;
