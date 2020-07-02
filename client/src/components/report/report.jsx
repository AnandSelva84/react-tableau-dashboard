import React, { Component, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
// import tableau from "tableau-api";
import { Button } from "@material-ui/core";
import { fromAppliedToOptions } from "../../redux/methods/tableau-methods";
import useData from "../../hooks/useStore";

const { tableau } = window;
// const url = "https://public.tableau.com/views/WorldIndicators/GDPpercapita";
// "https://public.tableau.com/views/Run_COVID_19/Dashboard?:display_count=y&:origin=viz_share_link";
const TableauViz = (props) => {
  const container = useRef(null);
  const [viz, setViz] = React.useState(null);
  const [filters, setFilters] = React.useState(null);
  const { appliedFilters } = useData().sharedReducer;
  let url = "http://public.tableau.com/views/RegionalSampleWorkbook/College";

  const initFilters = {
    College: ["Music"],
    Gender: ["Men"],
  };

  const options = {
    hideTabs: true,
    width: "100%",
    ...props.options,
    // ...filters,
    // Year: ["2009"],
  };

  const handleClcik = () => {
    sheet().clearFilterAsync("Region");

    setFilters(initFilters);
  };

  const initViz = () => {
    // let viz = new tableau.Viz(container.current, url);
    setViz(new tableau.Viz(container.current, url, options));
  };

  React.useEffect(() => {
    initViz();
  }, []);

  const sheet = () => {
    return viz.getWorkbook().getActiveSheet();
  };

  const applyfilter = (id = "", value = []) => {
    sheet().applyFilterAsync(id, value, tableau.FilterUpdateType.REPLACE);
  };

  const handleApply = (filterObj = null) => {
    debugger;
    const allKeys = Object.keys(filterObj);
    allKeys.forEach((key) => {
      console.log(`id is ${key}`);
      console.log("id is value is", filterObj[key]);
      applyfilter(key, filterObj[key]);
    });
  };

  React.useEffect(() => {
    if (!!viz) {
      console.log("initt values", fromAppliedToOptions(appliedFilters));
      const finalFormat = fromAppliedToOptions(appliedFilters);
      // handleApply(initFilters);
    }
  }, [appliedFilters, !!viz]);

  const yearFilter = (year) => {
    sheet().applyFilterAsync(
      "College",
      "Music",
      tableau.FilterUpdateType.REPLACE
    );
  };

  const setAfrica = () => {
    applyfilter("Gender", ["Men"]);
    applyfilter("College", ["Music"]);
    applyfilter("Gender", ["Women"]);

    // sheet().applyFilterAsync(
    //   "Gender",
    //   ["Men"],
    //   tableau.FilterUpdateType.REPLACE
    // );
  };

  return (
    <>
      <button
        onClick={() => {
          yearFilter();
        }}
      >
        college filter
      </button>
      <button
        onClick={() => {
          handleApply(initFilters);
        }}
      >
        region filter
      </button>
      <div
        className=""
        style={{ width: "100%", height: "100%" }}
        id={"name"}
        ref={container}
        // onClick={!!props.onClick && props.onClick()}
      ></div>
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
//         debugger;
//         let workbook = viz.getWorkbook();
//         let activeSheet = workbook.getActiveSheet();
//       },
//     };
//     debugger;

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
