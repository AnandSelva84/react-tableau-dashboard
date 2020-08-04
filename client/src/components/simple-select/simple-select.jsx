import React, { useState } from "react";
import { ClickAwayListener, CardActionArea } from "@material-ui/core";
import OptionsWrapper from "./../global-filter/optionsWrapper";
import { TextField } from "@material-ui/core";
import select from "./../../theme/select";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteBtn from "./deleteBtn/index";

const Option = (props) => {
  return (
    <>
      <CardActionArea
        ref={props.ref}
        style={{ ...select.option, minHeight: "42px", padding: "auto 1rem" }}
        onClick={() => props.onClick()}
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
  const [selectedValue, setSelectedValue] = useState("");
  const { options, handleChange, deleteable, onDelete } = props;

  const hanldeClose = () => {
    try {
      setShowMenu(false);
    } catch (error) {}
  };

  const handleOpen = () => {
    setShowMenu(true);
  };

  const toggle = () => {
    showMenu ? hanldeClose() : handleOpen();
  };

  const handleClick = (option) => {
    handleChange(option);
    setShowMenu(false);
  };

  return (
    <ClickAwayListener onClickAway={hanldeClose}>
      <div style={{ position: "relative", paddingTop: "1rem", ...props.style }}>
        <TextField
          size={props?.size}
          onClick={toggle}
          fullWidth
          style={{ maxWidth: "20rem" }}
          variant="outlined"
          // placeholder={!props.custom ? props?.title : props.placeholder}
          label={props?.label || "Time Interval"}
          value={props?.value || ""}
          InputProps={{
            readOnly: !!props.readWrite ? false : true,
          }}
        />
        {showMenu && (
          <OptionsWrapper onScroll={() => {}} onClose={() => {}}>
            {options.map((option) => (
              <Option
                display={option.filter_display_text}
                onClick={() => handleClick(option)}
              />
            ))}
          </OptionsWrapper>
        )}
        {deleteable && (
          <DeleteBtn onClick={onDelete} style={{ left: "50px" }} />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SimpleSelect;
