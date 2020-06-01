import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import {
  addFilter,
  deleteFilter,
  editFilterState,
} from "../../redux/actions/shared";
import { isExist } from "../../redux/methods/is-exist";
import { filterModel } from "../../models/filter";
import Option from "../select/option";

//props.values should be filtered before passing it to it's component
const PrevSelect = (props) => {
  const {
    filterOptionId,
    filter_display_text,
    filter_value_text,
  } = filterModel.values[0];

  const dispatch = useDispatch();

  const { filters, filterState, newFilters } = useData().sharedReducer;
  console.log("initial ", filterState);

  const [newFilterState, setNewFilterState] = useState(filterState);

  const values = props.values.map((value) => ({ ...value, lvl: props.lvl }));
  const [localFilters, setLocalFilters] = useState(props.values);
  const chosenIds = filterState.map((filter) => filter.ID) || [];
  const chosenLvls = filterState.map((filter) => filter.lvl) || [];

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
    console.log(isParentExist);
    console.log(afterFilter);
    // editFilter(afterFilter);
  }, [chosenIds]);

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

  const handleClick = (ParentName, value, lvl, ID, parentId) => {
    const id = ParentName;
    !isExist(filterState, id, value, ID)
      ? dispatch(addFilter({ id, value, lvl, ID, parentId }))
      : dispatch(deleteFilter({ id, value, lvl, ID, parentId }));
  };

  const getChosen = () => {
    //check the title and value
    let data = filterState.filter((filter) => filter.id === props.title);
    if (!!!data) data = [];
    const pureFilters = data.map((filter) => filter.value);
    if (!!!pureFilters) return [];
    return pureFilters;
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

  const Chosen = (props) => {
    const { filters } = props;
    return (
      <div style={{ display: "flex" }}>
        {filters.map((filter) => (
          <p style={{ fontSize: "0.7rem", marginRight: "0.2rem" }}>{filter},</p>
        ))}
      </div>
    );
  };

  const getOptions = () => {
    const options = props.values.filter(
      (value) => hasParentTest(value.parentFilterOptionId) || props.lvl === 0
    );
    return options;
  };

  const getAllPossibleFilters = (parentTitle) => {
    // const rawPossible =
    //   newFilters.filter((filter) => filter.title === parentTitle)[0]?.values ||
    //   [];

    const possible = getOptions().map((option) => ({
      id: parentTitle,
      ID: option.filterOptionId,
      lvl: props.lvl,
      parentId: option.parentFilterOptionId,
      value: option.filter_value_text,
    }));
    return possible;
  };

  const isAllExisted = (parentTitle) => {
    //compare what is in the filterState and what is in the resposne
    const toCompare = getAllPossibleFilters(parentTitle);
    const existanceLength =
      filterState.filter((value) => value.id === props.title)?.length || 0;
    const existance = existanceLength === toCompare.length;
    return existance;
  };

  const selectAll = () => {
    dispatch(
      editFilterState([...filterState, ...getAllPossibleFilters(props.title)])
    );
  };

  const unSelectAll = () => {
    dispatch(
      editFilterState([
        ...filterState.filter((filter) => filter.id !== props.title),
      ])
    );
  };

  const handleSelectAll = () => {
    const AllChecked = isAllExisted(props.title);
    console.log("all is selected!");
    if (AllChecked) {
      unSelectAll();
    } else {
      selectAll();
    }
  };

  return (
    <>
      {true && (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography style={{ fontSize: "1rem" }}>
                {props.title}
              </Typography>
              <Chosen filters={getChosen()} />
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {props.lvl !== 0 && (
                <Option
                  checked={isAllExisted(props.title)}
                  filterState={filterState}
                  onClick={handleSelectAll}
                  display={"All"}
                />
              )}
              {getOptions()
                .sort(sortOptions)
                .map((option) => (
                  <Option
                    checked={isExist(
                      filterState,
                      props.title,
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
                        props.title,
                        option.filter_value_text,
                        props.lvl,
                        option.filterOptionId,
                        option.parentFilterOptionId
                      )
                    }
                  />
                ))}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </>
  );
};
export default PrevSelect;
