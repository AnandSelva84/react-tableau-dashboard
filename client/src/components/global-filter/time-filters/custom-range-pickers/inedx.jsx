import React from "react";
import { TextField } from "@material-ui/core";

export default function CustomRange(props) {
  const handleChange = (e) => {
    const { value } = e.target;
    props.onChange(value);
  };
  return (
    <TextField
      id="date"
      label={props?.label || "unkown"}
      type="date"
      defaultValue={new Date().toLocaleDateString()}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      style={{ marginTop: "1rem" }}
      onChange={handleChange}
    />
  );
}
