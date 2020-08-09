import React, { Component } from "react";
import PropTypes from "prop-types";
import { PureComponent } from "react";
import { isEquelObj, getArrayValue } from "../../redux/methods/array-handling";

const url = "http://public.tableau.com/views/RegionalSampleWorkbook/College";
const { tableau } = window;

export default class ClassReport extends PureComponent {
  constructor(props) {
    super(props);
    this.url = this.props.url;
    this.vizRef = React.createRef();
    this.tableauViz = null;
    this.workbook = null;
    this.sheet = null;
    this.initViz = this.initViz.bind(this);
    this.firstInteractive = this.firstInteractive.bind(this);
  }

  applyfilter(id = "", value = []) {
    this.sheet.applyFilterAsync(id, value, tableau.FilterUpdateType.REPLACE);
  }

  handleApply(filterObj) {
    console.error("change should be applied");
    const allKeys = Object.keys(filterObj);
    allKeys.forEach((key) => {
      this.applyfilter(key, filterObj[key]);
    });
  }

  componentDidMount() {
    this.initViz();
  }

  firstInteractive() {
    this.workbook = this.tableauviz.getWorkbook();
    this.workbook.getActiveSheet().changeSizeAsync({ behavior: "AUTOMATIC" });

    // Get Sheet data
    const activeSheet = this.workbook.getActiveSheet();
    this.sheet = activeSheet;

    this.props.onReportReady();

    // !!this.sheet && alert("is interactive");
  }

  componentDidUpdate(prevProps, prevState) {
    const { props } = this;

    const currentFilters = props.filters;
    const prevFilters = prevProps.filters;
    const match = isEquelObj(currentFilters, prevFilters);

    //initial Apply
    if (
      !!this.props.reportState &&
      this.props.reportState !== prevProps.reportState
    )
      this.handleApply({ Gender: "Men" });

    if (this.props?.filters !== prevProps.filters && !!this.sheet && !match) {
      //  this.handleApply({ College: "Music" });
      this.handleApply({ ...currentFilters });
    }
  }

  initViz() {
    const options = {
      // ...filterOptions,
      hideTabs: true,
      hideToolbar: true,
      ...this.props.option,
      // height: this.currentHeight,
      // width: this.currentWidth,
      onFirstInteractive: this.firstInteractive,
    };

    if (this.tableauviz) {
      this.tableauviz.dispose();
      this.tableauviz = null;
    }

    this.tableauviz = new tableau.Viz(this.vizRef.current, this.url, options);
  }

  render() {
    return <div ref={this.vizRef}></div>;
  }
}
