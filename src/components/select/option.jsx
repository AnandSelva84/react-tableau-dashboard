import React from "react";
import { CardActionArea, Checkbox } from "@material-ui/core";
import select from "../../theme/select";

const Option = (props) => {
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
