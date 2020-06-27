import React from "react";
import ClickableIcon from "../icon-button";
import "./navigator.css";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Popover from "../popover/popover";
const Letter = (props) => {
  const getTitle = () => {
    debugger;
    return props.panels[props.index]?.title;
  };

  return (
    <div className="">
      <Popover content={getTitle()}>{props.letter}</Popover>
    </div>
  );
};

const LetterGroup = (props) => {
  const history = useHistory();
  const [index, setIndex] = React.useState(null);

  const haneleClick = (index) => {
    const route = props.panels[index]?.route;
    if (!!route) history.push(`./${route}`);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    setIndex(null);
  };

  const open = !!anchorEl;
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="letter-group">
      {props.letters.map((letter, i) => (
        <>
          <ClickableIcon
            // onMouseOver={() => {
            //   setIndex(i);
            // }}
            // onMouseOut={handleClose}
            icon={<Letter letter={letter} index={i} panels={props.panels} />}
            onClick={() => {
              haneleClick(i);
            }}
            style={{ color: "#fff" }}
            size="small"
          />
          {/* <Popover
            id={id}
            open={i === index}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Typography>{props.panels[i]?.title}</Typography>
          </Popover> */}
        </>
      ))}
    </div>
  );
};

export default LetterGroup;
