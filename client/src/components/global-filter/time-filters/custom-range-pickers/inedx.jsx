import React from "react";
import { TextField } from "@material-ui/core";
import { PropTypes } from "prop-types";

export default function DateSelect(props) {
  const { value } = props;
  const defaultValue = value ? value : "";
  const handleChange = (e) => {
    const { value: _value } = e.target;
    props.onChange(_value);
  };

  return (
    <TextField
      id="date"
      label={props?.label || "unkown"}
      type="date"
      defaultValue={defaultValue}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      style={{ marginTop: "1rem" }}
      onChange={handleChange}
    />
  );
}

DateSelect.propTypes = {
  value: PropTypes.any,
  label: PropTypes.any,
  onChange: PropTypes.func,
};
