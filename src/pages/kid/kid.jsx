import React from "react";
import "./kid.css";
import Panel from "./panel";

const KeyIndicators = () => {
  return (
    <>
      <div className="kid-panel-wrapper">
        <Panel />
        <Panel />
        <Panel />
      </div>
      <div className="kid-panel-wrapper">
        <Panel />
        <Panel />
        <Panel />
      </div>
    </>
  );
};

export default KeyIndicators;
