import React, { useState } from "react";
import { ClickAwayListener, CardActionArea } from "@material-ui/core";
import OptionsWrapper from "./../global-filter/optionsWrapper";
import { TextField } from "@material-ui/core";
import select from "./../../theme/select";
import Checkbox from "@material-ui/core/Checkbox";

const Option = (props) => {
  return (
    <>
      <CardActionArea
        ref={props.ref}
        style={{ ...select.option, minHeight: "42px", padding: "auto 1rem" }}
        onClick={() => {}}
      >
        <div style={{ paddingLeft: "1rem", fontSize: "16px" }}>
          {props.display}
        </div>
      </CardActionArea>
    </>
  );
};

const SimpleSelect = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const hanldeClose = () => {
    setShowMenu(false);
  };

  const handleOpen = () => {
    setShowMenu(true);
  };

  const toggle = () => {
    showMenu ? hanldeClose() : handleOpen();
  };

  return (
    <ClickAwayListener onClickAway={hanldeClose}>
      <div style={{ position: "relative", paddingTop: "1rem" }}>
        <TextField
          onClick={toggle}
          fullWidth
          style={{ maxWidth: "20rem" }}
          variant="outlined"
          // placeholder={!props.custom ? props?.title : props.placeholder}
          label={"Time Interval"}
        />
        {showMenu && (
          <OptionsWrapper onScroll={() => {}} onClose={() => {}}>
            {[1, 2, 3].map((value) => (
              <Option display={"value"} />
            ))}
          </OptionsWrapper>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SimpleSelect;
