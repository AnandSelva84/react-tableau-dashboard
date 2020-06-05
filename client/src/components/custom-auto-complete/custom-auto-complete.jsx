import React, { useState } from "react";
import { TextField, Paper, ClickAwayListener } from "@material-ui/core";

const CustomSelect = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleOpen = () => {
    setShowMenu(true);
  };

  const hanldeClose = () => {
    setShowMenu(false);
  };

  const toggle = () => {
    showMenu ? hanldeClose() : handleOpen();
  };

  const handleTextChange = (text) => {
    props.onTextChange(text);
  };

  return (
    <ClickAwayListener onClickAway={hanldeClose}>
      <div style={{ position: "relative", paddingTop: "1rem" }}>
        <TextField
          onClick={toggle}
          fullWidth
          variant="outlined"
          onChange={handleTextChange}
          placeholder={props?.title || "Unkown"}
          label={props?.title || "Unkown"}
        />
        {showMenu && (
          <div
            style={{
              position: "absolute",
              top: "4.5rem",
              // maxHeight: "4rem",
              minWidth: "100%",
              zIndex: "100",
              // padding: "1.5rem 0",
            }}
          >
            {props.children}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default CustomSelect;
