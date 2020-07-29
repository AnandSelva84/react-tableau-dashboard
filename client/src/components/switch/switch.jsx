import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";

export const ToggleSwitch = withStyles((theme) => ({
  root: {
    width: 37.8,
    height: 22,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#1291D5",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#1291D5",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: "#f4f4f4",
    border: "0.1px solid gray",
  },
  track: {
    borderRadius: 21 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
