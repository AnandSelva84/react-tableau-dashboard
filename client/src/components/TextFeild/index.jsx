import React from "react";
import { TextField } from "@material-ui/core";
import { PropTypes } from "prop-types";

export default function OutlinedTextFeild(props) {
  const hadnleChange = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <TextField
      {...props}
      fullWidth
      style={{ ...props.style, width: "100%" }}
      variant="outlined"
      placeholder={props?.placeholder || ""}
      label={props.label}
      value={props?.value}
      onChange={hadnleChange}
    />
  );
}

OutlinedTextFeild.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  style: PropTypes.object,
};
