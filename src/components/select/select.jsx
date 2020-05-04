import React from "react";
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
import { addFilter, deleteFilter } from "../../redux/actions/shared";
import { isExist } from "../../redux/methods/is-exist";

/*
interface Select{
  id : string 
  value : stirng 
  dependancy : string  => it's a value that should be present in the global filter state to make the panel clickable 
}
*/

const Select = (props) => {
  const dispatch = useDispatch();

  const { filters, filterState } = useData().sharedReducer;

  const { dependancy, id: ID, title: Title } = props;

  const handleClick = (ParentName, value, parentId) => {
    const id = ParentName;
    !isExist(filterState, id, value)
      ? dispatch(addFilter({ id, value, parentId }))
      : dispatch(deleteFilter({ id, value, parentId }));
  };

  const isClickable = () => {
    const found = !!dependancy
      ? !!!filterState.find((filter) => filter.id === dependancy)
      : false;
    return found;
  };

  const getChosen = () => {
    let data = filterState.filter((filter) => filter.id === ID);
    if (!!!data) data = [];
    const pureFilters = data.map((filter) => filter.value);
    if (!!!pureFilters) return [];
    return pureFilters;
  };
  console.log("chosen", getChosen());
  const Chosen = (props) => {
    const { filters } = props;
    console.log("filters", filters);

    return (
      <>
        {filters.map((filter) => (
          <p style={{ fontSize: "0.7rem" }}>{filter}</p>
        ))}
      </>
    );
  };

  const filterValue = () => {
    //values should be filtered before initializing
  };

  const parentExistance = (parentId) => {
    //parentId should be in filter state as id
  };
  return (
    <>
      <ExpansionPanel disabled={isClickable()}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography style={{ fontSize: "1rem" }}>{props.title}</Typography>
            <Chosen filters={getChosen()} />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            {props.values.map((option) => (
              <Option
                checked={isExist(filterState, props.title, option.name)}
                value={option.name}
                id={props.id}
                parentId={option.parentId}
                onClick={() =>
                  handleClick(props.title, option.name, option.parentId)
                }
              />
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default Select;
