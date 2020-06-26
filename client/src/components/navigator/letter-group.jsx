import React from "react";
import ClickableIcon from "../icon-button";
import "./navigator.css";
import { useHistory } from "react-router-dom";
import Popover from "@material-ui/core/Popover";
import { Typography } from "@material-ui/core";

const Letter = (props) => <div className="">{props.letter}</div>;

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
            icon={<Letter letter={letter} index={i} />}
            onClick={() => {
              haneleClick(i);
            }}
            style={{ color: "#fff" }}
            size="small"
          />
          <Popover
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
          </Popover>
        </>
      ))}
    </div>
  );
};

export default LetterGroup;
