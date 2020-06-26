import React from "react";
import ClickableIcon from "../icon-button";
import "./navigator.css";
import { useHistory } from "react-router-dom";

const Letter = (props) => <div className="">{props.letter}</div>;

const LetterGroup = (props) => {
  const history = useHistory();

  const haneleClick = (index) => {
    const route = props.panels[index]?.route;
    if (!!route) history.push(`./${route}`);
  };

  return (
    <div className="letter-group">
      {props.letters.map((letter, index) => (
        <ClickableIcon
          icon={<Letter letter={letter} />}
          onClick={() => {
            haneleClick(index);
          }}
          style={{ color: "#fff" }}
          size="small"
        />
      ))}
    </div>
  );
};

export default LetterGroup;
