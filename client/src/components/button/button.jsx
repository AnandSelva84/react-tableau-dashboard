import React from "react";
import { Button as Btn } from "@material-ui/core";

const Button = (props) => {
  return (
    <Btn variant="contained" {...props}>
      {props.title || "null"}
    </Btn>
  );
};

export default Button;
