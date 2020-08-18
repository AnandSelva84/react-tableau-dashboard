import React, { useState } from "react";
import { ClickAwayListener, CardActionArea } from "@material-ui/core";
import OptionsWrapper from "./../global-filter/optionsWrapper";
import { TextField } from "@material-ui/core";
import select from "./../../theme/select";
import DeleteBtn from "./deleteBtn/index";
import { PropTypes } from "prop-types";

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

Option.propTypes = {
  ref: PropTypes.any,
  display: PropTypes.any,
  onClick: PropTypes.func,
};

const SimpleSelect = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { options, handleChange, deleteable, onDelete } = props;

  const hanldeClose = () => {
    try {
      setShowMenu(false);
    } catch (error) {
      return;
    }
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
            readOnly: props.readWrite ? false : true,
          }}
        />
        {showMenu && (
          <OptionsWrapper onScroll={() => {}} onClose={() => {}}>
            {options.map((option) => (
              <Option
                key={option.filter_display_text}
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

SimpleSelect.propTypes = {
  style: PropTypes.any,
  label: PropTypes.any,
  value: PropTypes.any,
  size: PropTypes.any,
  readWrite: PropTypes.any,
  options: PropTypes.any,
  handleChange: PropTypes.any,
  deleteable: PropTypes.any,
  onDelete: PropTypes.any,
};

export default SimpleSelect;
