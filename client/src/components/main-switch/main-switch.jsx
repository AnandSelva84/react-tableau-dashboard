import React from "react";
import useData from "../../hooks/useStore";
import { Paper, Switch, FormControlLabel, FormGroup } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setCurrentMainFilter } from "../../redux/actions/shared";

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
  const handleChange = (e) => {
    console.log("change in name", e.target.name);
    if (!!e.target.name) dispatch(setCurrentMainFilter(e.target.name));
  };

  return (
    <Paper style={{ padding: "0.5rem 1rem" }}>
      <FormGroup>
        <FormControlLabel
          label="Legacy"
          control={
            <Switch
              onChange={handleChange}
              checked={testForCheck("Legacy")}
              name="Legacy"
              color="primary"
            />
          }
        />
        <FormControlLabel
          label="Business"
          control={
            <Switch
              onChange={handleChange}
              checked={testForCheck("Business")}
              name="Business"
              color="secondary"
            />
          }
        />
      </FormGroup>
    </Paper>
  );
});

export default MainSwitch;
