import React from "react";
import useData from "../../hooks/useStore";
import {
  Switch,
  FormControlLabel,
  FormGroup,
  withStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setCurrentMainFilter, addFilter } from "../../redux/actions/shared";
import { purple, red } from "@material-ui/core/colors";
import { PropTypes } from "prop-types";

const CustomSwitch = withStyles({
  root: {
    // color: red[500],
  },
  switchBase: {
    color: "#3f51b5",
    "& + $track": {
      color: red[500],
    },
    "&$checked": {
      color: purple[500],
    },
    "&$checked + $track": {
      backgroundColor: purple[500],
    },
    "&$disabled + $track": {
      color: red[500],
      backgroundColor: red[500],
    },
  },
})(Switch);

const MainSwitch = (props) => {
  const { currentMainFilter, appliedFilters } = useData().sharedReducer;
  const dispatch = useDispatch();
  React.useEffect(() => {
    const originalValue = appliedFilters.find((f) => f.id === "Hierarchies")
      ?.value;
    if (originalValue) dispatch(setCurrentMainFilter(originalValue));
  }, []);

  const testForCheck = (name) => {
    return currentMainFilter === name;
  };
  const handleStoreUpdate = (name) => {
    dispatch(
      addFilter({
        id: "Hierarchies",
        value: name,
        lvl: 0,
        ID: name,
        parentId: null,
        filter_id: "Hierarchies",
        applied: true,
      })
    );
  };
  const handleChange = (e) => {
    props.onSwitch();
    const newName = currentMainFilter === "Legacy" ? "Business" : "Legacy";
    handleStoreUpdate(newName);
    if (e.target.name) dispatch(setCurrentMainFilter(newName));
  };
  const getName = () => {
    return currentMainFilter;
  };

  return (
    <div
      style={{
        padding: "0.5rem 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="" style={{ marginRight: "1rem" }}>
        Legacy
      </div>

      <FormGroup>
        <FormControlLabel
          label=""
          control={
            <CustomSwitch
              onChange={handleChange}
              checked={testForCheck("Business")}
              name={getName()}
              color="primary"
            />
          }
        />
      </FormGroup>
      <div className="">Business</div>
    </div>
  );
};

MainSwitch.propTypes = {
  onSwitch: PropTypes.func,
};

export default MainSwitch;
