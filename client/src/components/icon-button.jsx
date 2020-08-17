import React from "react";
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

ClickableIcon.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.any,
};

export default ClickableIcon;
