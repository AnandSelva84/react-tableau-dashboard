import React, { Component, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
// import tableau from "tableau-api";
import { Button } from "@material-ui/core";

const { tableau } = window;
const url = "https://public.tableau.com/views/WorldIndicators/GDPpercapita";
const TableauViz = (props) => {
  const container = useRef(null);
  const [viz, setViz] = React.useState(null);

  const initViz = () => {
    // let viz = new tableau.Viz(container.current, url);
    setViz(new tableau.Viz(container.current, url));
  };

  React.useEffect(() => {
    initViz();
  }, []);

  const sheet = () => {
    return viz.getWorkbook().getActiveSheet();
  };

  const yearFilter = (year) => {
    sheet().applyFilterAsync(
      "Region",
      "Asia",
      tableau.FilterUpdateType.REPLACE
    );
  };

  const setAfrica = () => {
    sheet().applyFilterAsync(
      "Region",
      ["Africa", "Asia"],
      tableau.FilterUpdateType.REPLACE
    );
  };

  return (
    <>
      <button
        onClick={() => {
          yearFilter();
        }}
      >
        asia filter
      </button>
      <button
        onClick={() => {
          setAfrica();
        }}
      >
        africa filter
      </button>
      <div className="" id={"name"} ref={container}></div>
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
