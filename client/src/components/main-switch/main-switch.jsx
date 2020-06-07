import React from "react";
import useData from "../../hooks/useStore";
import { Paper, Switch, FormControlLabel, FormGroup } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setCurrentMainFilter, addFilter } from "../../redux/actions/shared";

const MainSwitch = React.memo((props) => {
  const { currentMainFilter } = useData().sharedReducer;
  const dispatch = useDispatch();
  const [loaded, setLoaded] = React.useState(false);
  const [current, setCurrent] = React.useState("Business");
  React.useEffect(() => {
    setLoaded(true);
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
        filter_id: null,
      })
    );
  };
  const handleChange = (e) => {
    console.log("change in name", e.target.name);
    props.onSwitch();
    const newName = currentMainFilter === "Legacy" ? "Business" : "Legacy";
    handleStoreUpdate(newName);
    if (!!e.target.name) dispatch(setCurrentMainFilter(newName));
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
            <Switch
              onChange={handleChange}
              checked={testForCheck("Business")}
              name={getName()}
              color="primary"
            />
          }
        />
        {/* <FormControlLabel
          label="Business"
          control={
            <Switch
              onChange={handleChange}
              checked={testForCheck("Business")}
              name="Business"
              color="secondary"
            />
          }
        /> */}
      </FormGroup>
      <div className="">Business</div>
    </div>
  );
});

export default MainSwitch;
