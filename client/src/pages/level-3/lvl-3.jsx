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
import {
  getViewDataByRoute,
  filterMappingResult,
} from "../../redux/methods/panel-pocessing";
import WrappedReport from "../../components/report/report";

const LVL_3 = React.memo((props) => {
  const { singleReportData } = props;
  const { panel_header_title: ReportTitle, embedded_viz } = singleReportData;
  const { embed_url: ReportURL } = embedded_viz[0];

  const { url } = props;
  const filterMapping = props.getVizDataByUrl(url).embedded_viz[0]
    .filter_mapping;
  const title = props.getVizDataByUrl(url).panel_header_title;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setCurrentLocation(ReportTitle));
  }, [title]);

  return (
    <>
      {!!props.url && (
        <WrappedReport
          options={{ height: "82vh" }}
          url={ReportURL}
          filterMappingResult={filterMappingResult}
          filterMapping={filterMapping}
          hideToolbar={false}
        />
      )}
    </>
  );
});

export default LVL_3;
