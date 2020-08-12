import React, { useState } from "react";
import { TextField, ClickAwayListener } from "@material-ui/core";
import { PropTypes } from "prop-types";

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

CustomSelect.propTypes = {
  filterMapping: PropTypes.object,
  onTextChange: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.any,
};

export default CustomSelect;
