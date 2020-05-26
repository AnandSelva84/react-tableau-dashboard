import React from "react";
import "./lvl-3.css";
// import SplitPane  from "react-split-pane";
import Button from "../../components/button/button";
import SplitPane from "react-split-pane";

const LVL_3 = (props) => {
  return (
    <>
      <SplitPane split="horizontal">
        <div className="">hello </div>
        <div className="">hello</div>
      </SplitPane>
    </>
  );
};

export default LVL_3;
