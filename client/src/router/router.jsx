import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../layout/header/header";
import SideDrawer from "../layout/drawer/drawer";
import Main from "../pages/main/main";
import useData from "../hooks/useStore";
import SubHeader from "../layout/sub-header/sub-header";
import LVL_3 from "../pages/level-3/lvl-3";
import LVL_2 from "../pages/level-2/lvl-2";
import SwipSideDrawer from "../layout/drawer/swipeable-drawer";
import ToolBar from "../components/tool-bar/tool-bar";
import SubRouter from "../pages/sub-router/sub-router";
import Snackbar from "../components/snackbar/snackbar";
import LoadingWrapper from "../components/loading-hoc";
import Footer from "../layout/footer";
//import Report from "../pages/report/tableau-report";
// import TableauViz from "../pages/report/report";
// import TableauViz from "../pages/report/report";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="">
        <SwipSideDrawer>
          <Header />
          <SubHeader />
          {/* <ToolBar /> */}
          <Switch>
            <Route exact path="/" component={() => LoadingWrapper(Main)} />
            <Route
              exact
              path="/:id"
              component={() => LoadingWrapper(SubRouter)}
            />
            {/* <Route exact path="/r/report" component={() => <TableauViz />} /> */}
          </Switch>
          <Snackbar />
          <Footer />
        </SwipSideDrawer>
      </div>
    </BrowserRouter>
  );
};

export default Router;

// <Route exact path="/lvl3" component={() => <LVL_3 />} />
//             <Route exact path="/lvl2" component={() => <LVL_2 />} />
