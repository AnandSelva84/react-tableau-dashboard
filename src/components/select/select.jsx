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
  const { dependancy } = props;

  const isExist = (id, value) => {
    const idExist = filterState.find((filter) => filter.id === id);
    if (!!!idExist) return false;
    const valueExist = filterState.find((filter) => filter.value === value);
    if (!!!valueExist) return false;
    return true;
  };

  const handleClick = (id, value) => {
    !isExist(id, value)
      ? dispatch(addFilter({ id, value }))
      : dispatch(deleteFilter({ id, value }));
  };

  const isClickable = () => {
    const found = !!dependancy
      ? !!!filterState.find((filter) => filter.id === dependancy)
      : false;
    return found;
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
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            {props.values.map((option) => (
              <Option
                checked={isExist(props.id, option)}
                value={option}
                id={props.id}
                onClick={() => handleClick(props.id, option)}
              />
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default Select;
