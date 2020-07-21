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
import TableauViz from "../../components/report/report";
import { getViewDataByRoute, filterMappingResult } from "../../redux/methods/panel-pocessing";
// import TableauViz from "../report/report";

const LVL_3 = React.memo((props) => {
  debugger
  const { id: route } = useParams()
  const { vizData } = props
  //we cant get from props.vizData the id and titl
  //from route get the id
  const { app } = useData().sharedReducer;
  const { all_views } = app


  const { id } = all_views.find(view => view.route === route)

  const found = vizData.find(viz => viz.view_id === id)

  const { url } = props
  const filterMapping =
    props.getVizDataByUrl(url).embedded_viz[0].filter_mapping;
  const title = props.getVizDataByUrl(url).panel_header_title
  debugger



  // const { app, panels } = useData().sharedReducer;
  // const { all_views = [] } = app;
  // const { id: route } = useParams()
  // const panel = getViewDataByRoute(route, all_views) || null;
  // alert('render')
  // const { vizData } = props
  // console.log({ vizData });
  // debugger
  // const url = vizData[0]?.embedded_viz[0]?.embed_url

  // const [showDetails, setShowDetails] = useState(false);
  // const [value, setValue] = React.useState("graph");
  const dispatch = useDispatch();
  // const { state } = useLocation();
  // const { showValue, app } = useData().sharedReducer;
  // const { focus_area } = app;
  // let { id } = useParams();

  // const getUrlData = () => {
  //   const allItems = focus_area.map((p) => p.items).flat();
  //   let found = allItems.find((item) => item.route === id);
  //   let url = found?.level3_action_url || "";
  //   return url;
  // };

  React.useEffect(() => {
    dispatch(setCurrentLocation(title));
  }, [title]);

  // React.useEffect(() => {
  //   dispatch(toggleShowReport());
  //   return () => {
  //     dispatch(toggleShowReport());
  //   };
  // }, []);

  // const handleGraphClick = () => {
  //   // setShowDetails(true);
  //   // setValue("both");

  //   dispatch(setShowControl("both"));
  // };

  // const handleAlignment = (e, selected) => {
  //   setValue(selected);
  // };

  // const showTable = showValue === "table";
  // const showGraph = showValue === "graph";
  // const showBoth = showValue === "both";

  // const tableauGraph = id === "storyDeliveryTime";

  return (
    <>
      {/* {showDetails && (
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
            {tableauGraph && (
              <TableauViz options={{ height: "80vh" }} url={getUrlData()} />
            )}
          </div>
        )}
        {(showTable || showBoth) && <div className="unit">This is a table</div>}
      </SplitterLayout> */}
      {!!props.url && <TableauViz options={{ height: "200vh" }} url={props.url} filterMappingResult={filterMappingResult} filterMapping={filterMapping} />}
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
