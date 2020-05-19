import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Option from "./option";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import {
  addFilter,
  deleteFilter,
  editFilterState,
} from "../../redux/actions/shared";
import { isExist } from "../../redux/methods/is-exist";
import { filterModel } from "../../models/filter";
import { sortOptions } from "../../redux/methods/array-handling";

//props.values should be filtered before passing it to it's component
const Select = (props) => {
  const dispatch = useDispatch();
  const { filterState } = useData().sharedReducer;

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
  }, [filterState]);

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

  const handleClick = (ParentName, value, lvl, ID, parentId) => {
    const id = ParentName;
    !isExist(filterState, id, value)
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

  const Chosen = (props) => {
    const { filters } = props;
    return (
      <div style={{ display: "flex" }}>
        {filters.map((filter, index) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: "0.7rem", marginRight: "0.2rem" }}>
              {filter}
            </p>
            {index !== filters.length - 1 && <div>,</div>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {localFilters.length > 0 && (
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
              {props.values.sort(sortOptions).map((option) => (
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

export default Select;
