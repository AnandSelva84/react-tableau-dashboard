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
import { useLocation, useParams } from "react-router-dom";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import { useDispatch } from "react-redux";
import {
  toggleShowReport,
  setCurrentLocation,
  setShowControl,
} from "../../redux/actions/shared";
import useData from "../../hooks/useStore";
import { getPanel } from "../../redux/methods/get-level";

const LVL_3 = React.memo((props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [value, setValue] = React.useState("graph");
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { showValue } = useData().sharedReducer;

  let { id } = useParams();

  React.useEffect(() => {
    !!id && dispatch(setCurrentLocation(getPanel(id)?.title || ""));
  }, [id]);

  React.useEffect(() => {
    dispatch(toggleShowReport());
    return () => {
      dispatch(toggleShowReport());
    };
  }, []);

  const handleGraphClick = () => {
    // setShowDetails(true);
    // setValue("both");

    dispatch(setShowControl("both"));
  };

  const handleAlignment = (e, selected) => {
    setValue(selected);
  };

  const showTable = showValue === "table";
  const showGraph = showValue === "graph";
  const showBoth = showValue === "both";

  return (
    <>
      {showDetails && (
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        ></div>
      )}
      <SplitterLayout vertical>
        {(showGraph || showBoth) && (
          <div className="unit" onClick={handleGraphClick}>
            This is a graph
          </div>
        )}
        {(showTable || showBoth) && <div className="unit">This is a table</div>}
      </SplitterLayout>
    </>
  );
});

export default LVL_3;

//  <ToggleButtonGroup value={value} exclusive onChange={handleAlignment}>
//       <ToggleButton value="graph" aria-label="left aligned">
//         <BarChart />
//       </ToggleButton>
//       <ToggleButton value="both" aria-label="centered">
//         <SwapVert />
//       </ToggleButton>
//       <ToggleButton value="table" aria-label="right aligned">
//         <TableChart />
//       </ToggleButton>
//     </ToggleButtonGroup>
