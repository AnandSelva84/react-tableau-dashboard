import React from "react";
import { colors } from "./../../constants/colors";
import { PropTypes } from "prop-types";

const StyledTitle = (props) => {
  const subTitles = props.title.split(" ");
  const className = props?.className || "";
  const { middleColor = colors.usaa_blue } = props;
  return (
    <div style={{ display: "flex" }}>
      {subTitles.map((singleTitle, index) => (
        <div
          key={singleTitle}
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

StyledTitle.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  middleColor: PropTypes.string,
};

export default StyledTitle;
