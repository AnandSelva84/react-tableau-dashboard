import React, { useState } from "react";
import "./lvl-3.css";
// import SplitPane  from "react-split-pane";
import Button from "../../components/button/button";
//import SplitPane from "react-split-pane";
//import SplitterLayout from "react-splitter-layout";
//import "react-splitter-layout/lib/index.css";
//import ToggleButton from "@material-ui/lab/ToggleButton";
//import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  BarChart,
  TableChart,
  SwapVert,
} from "@material-ui/icons";
import { ButtonGroup, IconButton } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import { useDispatch } from "react-redux";
import { toggleShowReport } from "../../redux/actions/shared";

const LVL_3 = React.memo((props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [value, setValue] = React.useState("graph");
  const dispatch = useDispatch();
  const { state } = useLocation();

  React.useEffect(() => {
    dispatch(toggleShowReport());
    return () => {
      dispatch(toggleShowReport());
    };
  }, []);

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          padding: "2rem",
        }}
        className=""
      >
        {state?.title || "unknown"}
      </div>
      {showDetails && (
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <ToggleButtonGroup value={value} exclusive onChange={handleAlignment}>
            <ToggleButton value="graph" aria-label="left aligned">
              <BarChart />
            </ToggleButton>
            <ToggleButton value="both" aria-label="centered">
              <SwapVert />
            </ToggleButton>
            <ToggleButton value="table" aria-label="right aligned">
              <TableChart />
            </ToggleButton>
          </ToggleButtonGroup> */}
          <ButtonGroup>
            <IconButton
              onClick={() => setValue("graph")}
              style={{ backgroundColor: !!showGraph ? "#f4f4f4" : "" }}
            >
              <BarChart />
            </IconButton>
            <IconButton
              style={{ backgroundColor: !!showBoth ? "#f4f4f4" : "" }}
              onClick={() => setValue("both")}
            >
              <SwapVert />
            </IconButton>
            <IconButton
              style={{ backgroundColor: !!showTable ? "#f4f4f4" : "" }}
              onClick={() => setValue("table")}
            >
              <TableChart />
            </IconButton>
          </ButtonGroup>
        </div>
      )}
      {/* <div className="split"> */}
      <SplitterLayout vertical>
        {(showGraph || showBoth) && (
          <div className="unit" onClick={handleGraphClick}>
            This is a graph
          </div>
        )}
        {(showTable || showBoth) && <div className="unit">This is a table</div>}
      </SplitterLayout>

      {/* </div> */}
    </>
  );
});

export default LVL_3;
