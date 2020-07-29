import React from "react";
import "./index.css";
import { ToggleSwitch } from "../switch/switch";
import PanelSwitch from "../../pages/level-2/panel/panel-switch";

export default function PanelHeader(props) {
  const { embedded_fields, onSwitchChange, handleViewClick } = props;
  const { field_type } = embedded_fields[0];

  const handleChange = (e) => {
    const { checked } = e.target;
    onSwitchChange(checked);
  };

  return (
    <div className="panel-header-container">
      <div className="panel-title-private">{props.title}</div>
      {field_type === "Switch" && <PanelSwitch onChange={handleChange} />}
      <h3 className="report-link" onClick={handleViewClick}>
        View Report
      </h3>
    </div>
  );
}
