import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../layout/header/header";
import Main from "../pages/main/main";
import SubHeader from "../layout/sub-header/sub-header";
import SwipSideDrawer from "../layout/drawer/swipeable-drawer";
import SubRouter from "../pages/sub-router/sub-router";
import Snackbar from "../components/snackbar/snackbar";
import LoadingWrapper from "../components/loading-hoc";
import Footer from "../layout/footer";
import "./index.css";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <SwipSideDrawer></SwipSideDrawer>
        <Header />
        <SubHeader />
        <Switch>
          <Route exact path="/" component={() => LoadingWrapper(Main)} />
          <Route
            exact
            path="/:id"
            component={() => LoadingWrapper(SubRouter)}
          />
        </Switch>
        <Snackbar />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Router;
