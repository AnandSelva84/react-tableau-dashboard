import React from "react";
import Popover from "../popover/popover";

export default function LetterIcon(props) {
  const getTitle = () => {
    return props.titles[props.index];
  };

  return (
    <div className="" style={{ fontSize: "1rem" }}>
      <Popover content={getTitle()}>{props.letter}</Popover>
    </div>
  );
}
