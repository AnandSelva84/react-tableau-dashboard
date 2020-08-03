import React from "react";
import { TextField } from "@material-ui/core";

const getToday = () => {
  let date = new Date().toLocaleDateString();
  let dateArray = date
    .split("/")
    .map((number) => (+number < 9 ? "0" + number : number));
  let newFormat = dateArray.reverse().join("-");
  return newFormat;
};

export default function DateSelect(props) {
  const { value } = props;
  const defaultValue = !!value ? value : getToday();
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
