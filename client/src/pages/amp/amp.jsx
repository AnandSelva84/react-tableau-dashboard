import React from "react";
import Panel from "./panel";

const AgileMetrics = () => {
  return (
    <>
      <div className="panel-wrapper">
        <Panel />
        <Panel />
      </div>
      <div className="panel-wrapper">
        <Panel />
        <Panel />
      </div>
      <div className="panel-wrapper">
        <Panel />
        <Panel />
      </div>
    </>
  );
};

export default AgileMetrics;
