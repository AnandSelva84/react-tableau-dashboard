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
  } = useData().sharedReducer;

  const [searchValue, setSearchValue] = useState("");
  const [checkedArray, setcheCheckedArray] = useState([]);
  const [allCheck, setAllCheck] = useState(false);

  const values = props.values.map((value) => ({ ...value, lvl: props.lvl }));
  const [localFilters, setLocalFilters] = useState(props.values);
  const chosenIds = filterState.map((filter) => filter.ID) || [];
  const chosenLvls = filterState.map((filter) => filter.lvl) || [];

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
    })),
    ...possibleAllSelect,
  ];

  const allButton = React.useRef(null);

  React.useEffect(() => {
    // console.log("refrence", allButton);

    if (!!allButton.current) allButton.current.click();
  }, [allButton.current]);

  const clickAll = () => {};

  React.useEffect(() => {
    const filterHaveParent = values.filter(
      (value) => value.parentFilterOptionId == null
    );
    const localValues = values.filter(
      (value) => hasLvlTest(value.lvl) && hasIdTest(value.parentFilterOptionId)
    );
    setLocalFilters([...localValues, ...filterHaveParent]);
    const afterFiltering = filterState.filter(
      (value) => !!hasParentTest(value.parentId)
    );
  }, [filterState]);

  const editFilter = React.useCallback(
    (afterFilter) => {
      dispatch(editFilterState(afterFilter));
    },
    [chosenIds]
  );

  React.useEffect(() => {
    const isParentExist = filterState.find((filter) =>
      chosenIds.some((id) => id === filter.parentId)
    );
    const afterFilter = filterState.filter(
      (filter) =>
        chosenIds.some((id) => id === filter.parentId) || filter.lvl === 0
    );
    // console.log(isParentExist);
    // console.log(afterFilter);
    // editFilter(afterFilter);
  }, [chosenIds]);

  const handlechange = (e) => {
    setSearchValue(e.target.value);
  };

  const hasLvlTest = (lvl) => {
    let hasLvl = chosenLvls.find((filterLvl) => filterLvl === lvl - 1);
    if (hasLvl === 0) hasLvl = 1;
    return !!hasLvl;
  };
  const hasIdTest = (id) => {
    let hasId = chosenIds.find((filterId) => filterId === id);
    if (hasId === 0) hasId = 1;
    return !!hasId;
  };

  const hasParentTest = (parentId) => {
    let hasId = chosenIds.find((id) => id === parentId);
    if (hasId === 0) hasId = 1;
    return !!hasId;
  };

  const handleClick = (ParentName, value, lvl, ID, parentId, filter_id) => {
    const id = ParentName;
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
    //compare what is in the filterState and what is in the resposne
    const toCompare = getAllPossibleFilters();
    // console.log("to compare", toCompare);

    // const allpossobilesinNewFilter = newFilters.filter(
    //   (filter) => filter.title === getTitle()
    // );

    // const chosenOne = allpossobilesinNewFilter?.filter((po) =>
    //   po.values.map((val) => val.filter_value).includes(getOptions().map(option => option.value)[0])
    // )[0];

    const existanceLength =
      filterState.filter((value) => value.id === getTitle())?.length || 0;
    const existance =
      existanceLength === toCompare.length && toCompare.length !== 0;
    // dispatch(setAllAreSelected({ title: getTitle(), hasAll: existance }));

    return existance;
  };

  const selectAll = () => {
    setShowMenu(false);

    dispatch(editFilterState([...newState]));
  };

  const unSelectAll = () => {
    setShowMenu(false);

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

  const panelProps = () => {
    const toReturn =
      props.lvl === 0
        ? {
            expanded: true,
          }
        : {};
    return toReturn;
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
    console.log("checkArray change for  ", props.title);
    console.log("checkArray change  ", checkedArray);
    const f = filterState.filter((filter) => filter.id === props.title).length;
    if (f === props.values.length) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [checkedArray]);

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

  const handleTextChange = (text) => {
    props.onTextChange(text);
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
  // if (props.lvl !== 0) {
  if (true) {
    return (
      <ClickAwayListener onClickAway={hanldeClose}>
        <div style={{ position: "relative", paddingTop: "1rem" }}>
          <TextField
            onClick={toggle}
            fullWidth
            variant="outlined"
            onChange={handlechange}
            placeholder={props?.title || "Unkown"}
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
                  display={"All"}
                  ref={allButton}
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

// else
//     return (
//       <>
//         {true && (
//           <ExpansionPanel {...panelProps()}>
//             <ExpansionPanelSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1a-content"
//               id="panel1a-header"
//             >
//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 {props.lvl === 0 && (
//                   <Typography style={{ fontSize: "1rem" }}>
//                     {getTitle()}
//                   </Typography>
//                 )}
//                 {props.lvl !== 0 && (
//                   <InputBase placeholder={getTitle()} onChange={handlechange} />
//                 )}
//                 {/* <Chosen filters={getChosen()} /> */}
//               </div>
//             </ExpansionPanelSummary>
//             <ExpansionPanelDetails>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   width: "100%",
//                   maxHeight: "5rem",
//                   overflowY: "auto",
//                 }}
//               >
//                 {props.lvl !== 0 && (
//                   <Option
//                     checked={isAllExisted()}
//                     filterState={filterState}
//                     onClick={handleSelectAll}
//                     display={"All"}
//                     ref={allButton}
//                   />
//                 )}
//                 {getOptionsAfterSearch()
//                   .sort(sortOptions)
//                   .map((option) => (
//                     <Option
//                       checked={isExist(
//                         filterState,
//                         getTitle(),
//                         option.filter_value_text
//                       )}
//                       value={option.filter_value_text}
//                       filterState={filterState}
//                       id={option.filterOptionId}
//                       parentId={option.parentFilterOptionId}
//                       lvl={props.lvl}
//                       display={option.filter_display_text}
//                       onClick={() =>
//                         handleClick(
//                           getTitle(),
//                           option.filter_value_text,
//                           props.lvl,
//                           option.filterOptionId,
//                           option.parentFilterOptionId,
//                           props.id
//                         )
//                       }
//                     />
//                   ))}
//               </div>
//             </ExpansionPanelDetails>
//           </ExpansionPanel>
//         )}
//       </>
//     );
