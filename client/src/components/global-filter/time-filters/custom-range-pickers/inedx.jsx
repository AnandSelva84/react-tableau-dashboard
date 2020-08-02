import React from "react";
import { TextField } from "@material-ui/core";

export default function DateSelect(props) {
  const { value } = props;
  const defaultValue = !!value ? value : "1-8-2020";
  const handleChange = (e) => {
    const { value } = e.target;
    props.onChange(value);
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
