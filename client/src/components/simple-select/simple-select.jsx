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
  const { options, handleChange } = props;

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

  // const options = [
  //   {
  //     title: "hello",
  //   },
  //   {
  //     title: "hello 1",
  //   },
  //   {
  //     title: "hello2",
  //   },
  // ];

  const handleClick = (option) => {
    handleChange(option);
    setShowMenu(false);
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
          value={props?.value?.value || ""}
          InputProps={{
            readOnly: true,
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
      </div>
    </ClickAwayListener>
  );
};

export default SimpleSelect;
