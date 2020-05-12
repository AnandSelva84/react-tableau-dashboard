import React from "react";
import { CardActionArea, Checkbox } from "@material-ui/core";
import select from "../../theme/select";
import { useDispatch } from "react-redux";
import { editFilterState } from "../../redux/actions/shared";

const Option = (props) => {
  const dispatch = useDispatch();
  const { checked, filterState, lvl } = props;
  React.useEffect(() => {
    //when unchecking an option check the lvl and clear all higher lvls
    console.log("option lvl ", lvl);
    console.log("option checked", checked);
    console.log("option filter state ", filterState);
    const afterEdit = filterState.filter((filter) => filter.lvl <= lvl);
    //only in deletion state
    if (!checked) dispatch(editFilterState(afterEdit));
  }, [checked]);
  return (
    <>
      <CardActionArea
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
        <div>{props.value}</div>
      </CardActionArea>
    </>
  );
};

export default Option;
