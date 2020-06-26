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
        size="medium"
        {...props}
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
