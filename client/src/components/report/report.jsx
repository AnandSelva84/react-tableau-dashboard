import React, { Component, useRef, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
// import tableau from "tableau-api";
import { Button } from "@material-ui/core";
import { fromAppliedToOptions } from "../../redux/methods/tableau-methods";
import useData from "../../hooks/useStore";
import { applyFilters } from "../../redux/actions/shared";
import { useDispatch } from "react-redux";
import "./report.css";
const { tableau } = window;

const TableauViz = (props) => {
  debugger;

  const container = useRef(null);
  const dispatch = useDispatch();
  const [viz, setViz] = React.useState(null);
  const [workbook, setWorkBook] = React.useState(null);
  const [vizIsInteractive, setVizIsInteractive] = React.useState(false);
  const { appliedFilters, savedFilters } = useData().sharedReducer;
  let url = props?.url;

  const reportFilters = fromAppliedToOptions(appliedFilters);
  const mappedfilters = props.filterMappingResult(
    reportFilters,
    props.filterMapping
  );

  const options = {
    hideTabs: true,
    hideToolbar: props.hideToolbar,
    width: "100%",
    ...props.options,
    ...mappedfilters,
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

  const sheet = () => {
    return viz.getWorkbook().getActiveSheet();
  };

  const isActiveSheet = () => {
    // alert(viz.getWorkbook().getActiveSheet().getIsActive());
    return viz.getWorkbook().getActiveSheet().getIsActive();
  };

  const applyfilter = (id = "", value = []) => {
    sheet().applyFilterAsync(id, value, tableau.FilterUpdateType.REPLACE);
  };

  const handleApply = (filterObj = null) => {
    const allKeys = Object.keys(filterObj);
    allKeys.forEach((key) => {
      console.log(`id is ${key}`);
      console.log("id is value is", filterObj[key]);
      applyfilter(key, filterObj[key]);
    });
  };

  React.useEffect(() => {
    if (!!workbook) {
      console.log("initt values", reportFilters);
      console.log("final filter to apply ", mappedfilters);
      const mockFilters = {
        College: "Music",
      };
      handleApply(mockFilters);
    }
  }, [!!viz, vizIsInteractive, appliedFilters, savedFilters, workbook]);

  if (!!!props.url) return null;

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

export default TableauViz;
