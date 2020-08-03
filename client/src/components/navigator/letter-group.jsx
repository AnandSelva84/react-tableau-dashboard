import React from "react";
import ClickableIcon from "../icon-button";
import "./navigator.css";
import { useHistory } from "react-router-dom";
import LetterIcon from "./LetterIcon";

const LetterGroup = (props) => {
  const { isActiveArray } = props;
  const history = useHistory();
  const haneleClick = (index) => {
    const route = props.routes[index];
    if (isActiveArray[index] && !!route) history.push(`./${route}`);
  };

  return (
    <div className="letter-group">
      {props.letters.map((letter, i) => (
        <>
          <ClickableIcon
            icon={
              <LetterIcon
                letter={letter}
                index={i}
                panels={props.panels}
                titles={props.titles}
                isActive={isActiveArray[i]}
              />
            }
            onClick={() => {
              haneleClick(i);
            }}
            style={{ color: "#fff" }}
            size="small"
          />
        </>
      ))}
    </div>
  );
};

export default LetterGroup;
