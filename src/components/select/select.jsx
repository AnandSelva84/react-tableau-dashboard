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

//props.values should be filtered before passing it to it's component
const Select = (props) => {
  const dispatch = useDispatch();
  const { filters, filterState } = useData().sharedReducer;
  const [newFilterState, setNewFilterState] = useState(filterState);

  const values = props.values.map((value) => ({ ...value, lvl: props.lvl }));
  const [localFilters, setLocalFilters] = useState(props.values);
  const chosenIds = filterState.map((filter) => filter.ID) || [];
  const chosenLvls = filterState.map((filter) => filter.lvl) || [];

  React.useEffect(() => {
    //filterstate : [{id:1 , parentId : null}]
    const filterHaveParent = values.filter((value) => value.parentId == null);
    const currentValues = filterHaveParent.filter((filter) =>
      hasLvlTest(filter.lvl)
    );

    const localValues = values.filter(
      (value) => hasLvlTest(value.lvl) && hasIdTest(value.parentId)
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
  const { dependancy, id: ID, title: Title } = props;

  const handleClick = (ParentName, value, lvl, ID, parentId) => {
    const id = ParentName;
    !isExist(filterState, id, value)
      ? dispatch(addFilter({ id, value, lvl, ID, parentId }))
      : dispatch(deleteFilter({ id, value, lvl, ID, parentId }));
    // if (lvl === 0 && isExist(filterState, id, value))
    //   dispatch(editFilterState([]));
  };

  const isClickable = () => {
    const found = !!dependancy
      ? !!!filterState.find((filter) => filter.id === dependancy)
      : false;
    return found;
  };

  const getChosen = () => {
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
        {filters.map((filter) => (
          <p style={{ fontSize: "0.7rem", marginRight: "0.2rem" }}>{filter},</p>
        ))}
      </div>
    );
  };

  return (
    <>
      {localFilters.length > 0 && (
        <ExpansionPanel disabled={isClickable()}>
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
              {localFilters.map((option) => (
                <Option
                  checked={isExist(filterState, props.title, option.name)}
                  value={option.name}
                  filterState={filterState}
                  id={option.id}
                  parentId={option.parentId}
                  lvl={props.lvl}
                  onClick={() =>
                    handleClick(
                      props.title,
                      option.name,
                      props.lvl,
                      option.id,
                      option.parentId
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
