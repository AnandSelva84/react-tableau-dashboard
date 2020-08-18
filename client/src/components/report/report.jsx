import React, { useRef, useState, useEffect } from "react";
import { fromAppliedToOptions } from "../../redux/methods/tableau-methods";
import useData from "../../hooks/useStore";
import "./report.css";
import { refactorTimeIntervalFilters } from "./../../redux/methods/panel-pocessing";
import { PropTypes } from "prop-types";
const { tableau } = window;

const WrappedReport = (props) => {
  const { appliedFilters } = useData().sharedReducer;
  const [render, setRender] = useState(true);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded) {
      setRender(false);
    }
  }, [appliedFilters.length, props.url, props.parameter]);

  useEffect(() => {
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!render) {
      setRender(true);
    }
  }, [render, loaded]);

  return <>{render && <TableauViz {...props} />}</>;
};

WrappedReport.propTypes = {
  url: PropTypes.string,
  parameter: PropTypes.string,
};

const TableauViz = (props) => {
  const container = useRef(null);
  const [viz, setViz] = React.useState(null);
  const [workbook, setWorkBook] = React.useState(null);
  const [vizIsInteractive, setVizIsInteractive] = React.useState(false);
  const {
    appliedFilters,
    savedFilters,
    appliedTimeIntervals,
  } = useData().sharedReducer;
  let url = props.url;

  const timeIntervalFilters = refactorTimeIntervalFilters(
    appliedTimeIntervals,
    props.filterMapping
  );
  const reportFilters = fromAppliedToOptions(appliedFilters);

  const mappedfilters = props.filterMappingResult(
    reportFilters,
    props.filterMapping
  );
  const mappedfiltersMergedWithTimeIntervals = {
    ...mappedfilters,
    ...timeIntervalFilters,
  };

  const options = {
    hideTabs: true,
    hideToolbar: props.hideToolbar,
    width: "100%",
    ...props.options,
    ...mappedfiltersMergedWithTimeIntervals,
    // ...reportFilters,
    onFirstInteractive: function () {
      setVizIsInteractive(true);
    },
  };

  const initViz = () => {
    setViz(new tableau.Viz(container.current, url, options));
  };

  React.useEffect(() => {
    initViz();
  }, []);

  React.useEffect(() => {
    if (vizIsInteractive) {
      setWorkBook(viz.getWorkbook().getActiveSheet());
      setVizIsInteractive(true);
    }
  });

  // const sheet = () => {
  //   return viz.getWorkbook().getActiveSheet();
  // };

  // const applyfilter = (id = "", value = []) => {
  //   sheet().applyFilterAsync(id, value, tableau.FilterUpdateType.REPLACE);
  // };

  // const handleApply = (filterObj = null) => {
  //   const allKeys = Object.keys(filterObj);
  //   allKeys.forEach((key) => {
  //     applyfilter(key, filterObj[key]);
  //   });
  // };

  React.useEffect(() => {
    if (workbook) {
      // handleApply(mappedfilters);
    }
  }, [!!viz, vizIsInteractive, appliedFilters, savedFilters, workbook]);

  if (!props.url) return null;

  return (
    <>
      <div style={{ width: "100%", height: "100%" }} className="dark-hover">
        <div
          className=""
          style={{ width: "100%", height: "100%", position: "relative" }}
          id={"name"}
          ref={container}
        >
          <div
            className=""
            style={{ position: "absolute", top: 0 }}
            onClick={() => {}}
          ></div>
        </div>
      </div>
    </>
  );
};

TableauViz.propTypes = {
  url: PropTypes.string,
  filterMapping: PropTypes.any,
  filterMappingResult: PropTypes.any,
  hideToolbar: PropTypes.any,
  options: PropTypes.any,
};

export default WrappedReport;
