import React, { useState } from "react";
import "./lvl-3.css";
// import SplitPane  from "react-split-pane";
import Button from "../../components/button/button";
//import SplitPane from "react-split-pane";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  BarChart,
  TableChart,
  SwapVert,
} from "@material-ui/icons";

const LVL_3 = React.memo((props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [value, setValue] = React.useState("graph");

  const handleGraphClick = () => {
    setShowDetails(true);
    setValue("both");
  };

  const handleAlignment = (e, selected) => {
    setValue(selected);
  };

  const showTable = value === "table";
  const showGraph = value === "graph";
  const showBoth = value === "both";
  return (
    <>
      {showDetails && (
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ToggleButtonGroup value={value} exclusive onChange={handleAlignment}>
            <ToggleButton value="graph" aria-label="left aligned">
              <BarChart />
            </ToggleButton>
            <ToggleButton value="both" aria-label="centered">
              <SwapVert />
            </ToggleButton>
            <ToggleButton value="table" aria-label="right aligned">
              <TableChart />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      )}
      <div className="split">
        <SplitterLayout vertical customClassName="split">
          {(showGraph || showBoth) && (
            <div onClick={handleGraphClick}>This is a graph</div>
          )}
          {(showTable || showBoth) && <div>This is a table</div>}
        </SplitterLayout>
      </div>
    </>
  );
});

export default LVL_3;
