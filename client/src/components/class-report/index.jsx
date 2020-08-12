import React from "react";
import { PureComponent } from "react";
import { isEquelObj } from "../../redux/methods/array-handling";
import { PropTypes } from "prop-types";
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

  componentDidUpdate(prevProps) {
    const { props } = this;

    const currentFilters = props.filters;
    const prevFilters = prevProps.filters;
    const match = isEquelObj(currentFilters, prevFilters);

    //initial Apply
    if (
      !!this.props.reportState &&
      this.props.reportState !== prevProps.reportState
    )
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

ClassReport.propTypes = {
  filters: PropTypes.object,
  onReportReady: PropTypes.func,
  url: PropTypes.string,
  reportState: PropTypes.bool,
  option: PropTypes.object,
};
