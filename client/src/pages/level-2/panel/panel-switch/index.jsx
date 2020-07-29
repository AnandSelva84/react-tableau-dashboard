import React from "react";
import { ToggleSwitch } from "../../../../components/switch/switch";
import "./index.css";

export default function PanelSwitch(props) {
  return (
    <div className="switch-container">
      <h5>Bar</h5>
      <ToggleSwitch {...props} />
      <h5>Box</h5>
    </div>
  );
}
