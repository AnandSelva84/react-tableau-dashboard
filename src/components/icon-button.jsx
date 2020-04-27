import React from "react";
import { Menu } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import PropTypes from "prop-types";

const ClickableIcon = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        size={props.size || 14}
        onClick={() => {
          props.onClick();
        }}
      >
        {props.icon}
      </IconButton>
    </div>
  );
};

ClickableIcon.propTypes = {
  icon: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ClickableIcon;
