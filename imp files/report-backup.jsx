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
// const url = "https://public.tableau.com/views/WorldIndicators/GDPpercapita";
// "https://public.tableau.com/views/Run_COVID_19/Dashboard?:display_count=y&:origin=viz_share_link";
const TableauViz = (props) => {
  debugger;
  const initFilters = {
    College: ["Music"],
    Gender: ["Men"],
  };
  const container = useRef(null);
  const dispatch = useDispatch();
  const [showOverFlow, setShowOverFlow] = useState(false);
  const [viz, setViz] = React.useState(null);
  const [workbook, setWorkBook] = React.useState(null);
  const [filters, setFilters] = React.useState({ ...initFilters });
  const [vizIsInteractive, setVizIsInteractive] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const { appliedFilters, savedFilters } = useData().sharedReducer;
  let url =
    props?.url ||
    "http://public.tableau.com/views/RegionalSampleWorkbook/College";

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
  }, [
    !!viz,
    vizIsInteractive,
    filters,
    appliedFilters,
    savedFilters,
    workbook,
  ]);

  const yearFilter = (year) => {
    sheet().applyFilterAsync(
      "College",
      "Music",
      tableau.FilterUpdateType.REPLACE
    );
  };

  const resetFilters = () => {
    setFilters({ Gender: ["Women"] });
  };

  if (!!!props.url) return null;

  const handleFChange = () => {
    dispatch(
      applyFilters([
        ...appliedFilters,
        {
          filter_id: "Gender",
          value: "Men",
        },
      ])
    );
  };

  const testNativeFilterMethod = () => {
    sheet().applyFilterAsync(
      "College",
      "Music",
      tableau.FilterUpdateType.REPLACE
    );
  };

  return (
    <>
      <button onClick={testNativeFilterMethod}> Test</button>
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

// class TableauViz extends Component {
//   componentDidMount() {
//     this.initViz();
//     // alert("render");
//   }

//   //Function call API
//   initViz() {
//     const vizUrl =
//       // "https://public.tableau.com/views/Run_COVID_19/Dashboard?:display_count=y&:origin=viz_share_link";
//       "https://public.tableau.com/views/WorldIndicators/GDPpercapita";
//     const options = {
//       height: "100vh",
//       width: "100%",
//       hideTabs: false,
//       hideToolbar: true,
//       onFirstInteractive: function () {
//         // let viz = window.tableau.Viz(this.vizContainer, vizUrl, options);
//         ;
//         let workbook = viz.getWorkbook();
//         let activeSheet = workbook.getActiveSheet();
//       },
//     };
//     ;

//     const vizContainer = this.vizContainer;
//     let viz = new window.tableau.Viz(vizContainer, vizUrl, options);
//     // const workbook = viz?.Workbook();
//     // const activeSheet = workbook.getActiveSheet();
//   }

//   applyNewFilter() {
//     console.log("this", this.activeSheet);

//     // this.window.tableau.activeSheet.applyFilterAsync(
//     //   "Region",
//     //   "The Americas",
//     //   tableau.FilterUpdateType.REPLACE
//     // );
//   }

//   render() {
//     return (
//       <div className="" style={{ width: "50rem", height: "100vh" }}>
//         <Button onClick={this.applyNewFilter.bind(this)}>update region</Button>
//         <div
//           ref={(div) => {
//             this.vizContainer = div;
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default TableauViz;

// const useStyles = (theme) => ({
//   respContainer: {
//     position: "relative",
//     paddingBottom: "56.25%",
//     paddingTop: "100px",
//     height: "100vh",
//     overflow: "hidden",
//   },
//   videoContainer: {
//     position: "absolute",
//     top: "0",
//     left: "0",
//     width: "100%",
//     height: "100%",
//   },
// });
