import React from "react";
import "./index.css";
import { ToggleSwitch } from "../switch/switch";

export default function PanelHeader(props) {
  const { embedded_fields, onSwitchChange } = props;
  const { field_type } = embedded_fields[0];

  const handleChange = (e) => {
    const { checked } = e.target;
    onSwitchChange(checked);
  };

  debugger;
  return (
    <div className="panel-header-container">
      <div className="panel-title-private">{props.title}</div>
      {field_type === "Switch" && <ToggleSwitch onChange={handleChange} />}
    </div>
  );
}
