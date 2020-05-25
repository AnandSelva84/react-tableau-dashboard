import React from "react";
import "./lvl-3.css";
// import SplitPane  from "react-split-pane";
import Button from "../../components/button/button";
//import SplitPane from "react-split-pane";
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

const LVL_3 = (props) => {
  return (
    <>
       <SplitterLayout vertical>
            <div>This is a div</div>
            <div>This is a div</div>
        </SplitterLayout> 
    </>
  );
};

export default LVL_3;
