import React from "react";
import "./index.css";
import { PropTypes } from "prop-types";

export default function PanelHeader(props) {
  const { handleViewClick } = props;

  return (
    <div className="panel-header-container">
      <div className="panel-title-private">{props.title}</div>
      {/* {field_type === "Switch" && <PanelSwitch onChange={handleChange} />} */}
      <h3 className="report-link" onClick={handleViewClick}>
        View Report
      </h3>
    </div>
  );
}

PanelHeader.propTypes = {
  handleViewClick: PropTypes.any,
  title: PropTypes.string,
};
