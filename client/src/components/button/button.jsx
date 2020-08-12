import React from "react";
import { Button as Btn } from "@material-ui/core";
import { PropTypes } from "prop-types";
const Button = (props) => {
  return (
    <Btn variant="contained" {...props}>
      {props.title || "null"}
    </Btn>
  );
};

Button.propTypes = {
  title: PropTypes.string,
};

export default Button;
