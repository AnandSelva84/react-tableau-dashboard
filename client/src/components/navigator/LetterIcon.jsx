import React from "react";
import Popover from "../popover/popover";

export default function LetterIcon(props) {
  const { isActive } = props;
  const getTitle = () => {
    return props.titles[props.index];
  };

  return (
    <div className="" style={{ fontSize: "1rem" }}>
      <Popover disabeld={isActive} content={getTitle()}>
        {props.letter}
      </Popover>
    </div>
  );
}
