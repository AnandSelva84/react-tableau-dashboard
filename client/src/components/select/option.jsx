import React from "react";
import { CardActionArea, Checkbox } from "@material-ui/core";
import select from "../../theme/select";
import { useDispatch } from "react-redux";
import { editFilterState } from "../../redux/actions/shared";

const Option = (props) => {
  const dispatch = useDispatch();
  const { checked, filterState, lvl } = props;
  const chosenIds = filterState.map((filter) => filter.ID) || [];
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    props.onChange(checked, props.id, props.parentId);
    const handledFilterStateChange = filterState.filter(
      (f) => !chosenIds.includes(f.parentFilterOptionId)
    );
    // console.log("onchange ", handledFilterStateChange);
    let locFilterState = filterState;
    let i = 0;

    while (i !== 4 && props.lvl === 1) {
      let prevLength = locFilterState.length;

      locFilterState = locFilterState.filter(
        (f) =>
          locFilterState.map((f) => f.ID).includes(f.parentId) || f.lvl === 0
      );
      const condition = locFilterState.length === prevLength;
      if (locFilterState.length == prevLength && i !== 0) {
        dispatch(editFilterState([...locFilterState]));
        // setValuesUpdated(true);
        console.log("match");
      }
      i++;

      // if (i === 3) {
      // dispatch(editFilterState([...locFilterState]));
      // }
      // if (i === 3)
    }
  }, [checked]);

  return (
    <>
      <CardActionArea
        ref={props.ref}
        style={{ ...select.option }}
        onClick={() => {
          props.onClick();
        }}
      >
        <Checkbox
          checked={!!props.checked}
          // onChange={props.onChange()}
          color="primary"
        />
        <div>{props.display}</div>
      </CardActionArea>
    </>
  );
};

export default Option;
