import React from "react";
import { colors } from "./../../constants/colors";

const StyledTitle = (props) => {
  const subTitles = props.title.split(" ");
  const className = props?.className || "";
  const { middleColor = colors.usaa_blue } = props;
  return (
    <div style={{ display: "flex" }}>
      {subTitles.map((singleTitle, index) => (
        <div
          className={className}
          style={{
            color: index % 2 === 0 ? "rgb(208,207,206)" : middleColor,
          }}
        >
          {singleTitle}
        </div>
      ))}
    </div>
  );
};

export default StyledTitle;
