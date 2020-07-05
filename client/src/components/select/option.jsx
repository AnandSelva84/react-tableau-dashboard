import React from "react";
import { CardActionArea, Checkbox } from "@material-ui/core";
import select from "../../theme/select";
import { useDispatch } from "react-redux";
import { editFilterState } from "../../redux/actions/shared";
import { continuesFilter } from "../../redux/methods/continous-filter";

const Option = (props) => {
  const dispatch = useDispatch();
  const { checked, filterState, lvl } = props;
  const chosenIds = filterState.map((filter) => filter.ID) || [];
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const onFilterEnd = (filters) => {
    dispatch(editFilterState([...filters]));
  };

  React.useEffect(() => {
    props.onChange(checked, props.id, props.parentId);

    continuesFilter(filterState, onFilterEnd);
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
