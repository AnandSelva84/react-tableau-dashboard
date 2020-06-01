import React from "react";
import { Menu } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import PropTypes from "prop-types";

const ClickableIcon = (props) => {
  return (
    <div
      onMouseDown={() => {
        props.onClick();
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={() => {
          props.onClick();
        }}
      >
        {props.icon}
      </IconButton>
    </div>
  );
};

export default ClickableIcon;
