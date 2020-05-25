import React from "react";
import "./lvl-3.css";
// import SplitPane  from "react-split-pane";
import Button from "../../components/button/button";
import SplitPane from "react-split-pane";

const LVL_3 = (props) => {
  return (
    <>
      <SplitPane split="horizontal" minSize={50} defaultSize={100}>
        {/* <div className="wrapper">
          <Button title="show table" />
        </div>
        <div className="wrapper"></div> */}
        {/* <Pane className="">hello world</Pane>
        <Pane className="">another one</Pane> */}
      </SplitPane>
    </>
  );
};

export default LVL_3;
