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
  const initFilters = {
    College: ["Music"],
    Gender: ["Men"],
  };

  const container = useRef(null);
  const [viz, setViz] = React.useState(null);
  const [filters, setFilters] = React.useState({ ...initFilters });
  const [vizIsInteractive, setVizIsInteractive] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const { appliedFilters, savedFilters } = useData().sharedReducer;
  let url =
    props?.url ||
    "http://public.tableau.com/views/RegionalSampleWorkbook/College";

  const reportFilters = fromAppliedToOptions(appliedFilters);

  const options = {
    hideTabs: true,
    width: "100%",
    ...props.options,
    ...reportFilters,
  };

  React.useEffect(() => {
    if (!vizIsInteractive)
      setTimeout(() => {
        setCounter(counter + 1);
      }, 200);
  }, [counter]);

  const handleClcik = () => {
    sheet().clearFilterAsync("Region");
    setFilters(initFilters);
  };

  const initViz = () => {
    setViz(new tableau.Viz(container.current, url, options));
  };

  React.useEffect(() => {
    initViz();
  }, []);

  React.useEffect(() => {
    console.log("change in ui");
    try {
      if (isActiveSheet()) setVizIsInteractive(true);
    } catch {}
  });

  const sheet = () => {
    return viz.getWorkbook().getActiveSheet();
  };

  const isActiveSheet = () => {
    // alert(viz.getWorkbook().getActiveSheet().getIsActive());
    return viz.getWorkbook().getActiveSheet().getIsActive();
  };

  const applyfilter = (id = "", value = []) => {
    try {
      sheet().applyFilterAsync(id, value, tableau.FilterUpdateType.REPLACE);
    } catch {}
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
    if (!!viz && vizIsInteractive) {
      console.log("initt values", reportFilters);
      handleApply(filters);
    }
  }, [!!viz, vizIsInteractive, filters, appliedFilters, savedFilters]);

  React.useEffect(() => {
    // if (!!viz && vizIsInteractive) {
    //   setFilters({ Gender: ["Women"] });
    // }
  }, [appliedFilters]);

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

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
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
