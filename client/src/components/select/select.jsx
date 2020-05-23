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
import { Select as AutoComplete } from "../auto-complete-select/auto-complete-select";

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

  const getValues = () => {
    const title = props.title;
    console.log(filterState);
    if (title === "COSA") return;

    return filterState.filter((value) => value.id === title);
  };
  const createOptions = () => {
    const pureOption = getValues();
    if (!!pureOption) {
      const newOptions = pureOption.map((option) => ({
        filterOptionId: option.ID,
        filter_value_text: option.value,
        filter_display_text: option.value,
        order: 1,
        parentFilterOptionId: null,
      }));
      console.log("pureoption", newOptions);
      return newOptions;
    } else {
      return [];
    }
  };

  return (
    <>
      {localFilters.length > 0 && (
        <>
          <AutoComplete
            // disableCloseOnSelect={props.disableCloseOnSelect}
            filterState={filterState}
            title={props.title}
            options={props.values}
            value={[...createOptions()]}
            multiple={props.multi}
            onChange={(e, obj, reason) => {
              try {
                if (!props.multi)
                  handleClick(
                    props.title,
                    obj.filter_value_text,
                    props.lvl,
                    obj.filterOptionId,
                    obj.parentFilterOptionId
                  );
                else
                  handleClick(
                    props.title,
                    e.target.innerText,
                    props.lvl,
                    obj[obj.length - 1].filterOptionId,
                    obj[obj.length - 1].parentFilterOptionId
                  );
              } catch {}
            }}
          />
        </>
      )}
    </>
  );
};

export default Select;

/* <ExpansionPanel>
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
        </ExpansionPanel> */
