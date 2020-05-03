import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../layout/header/header";
import SideDrawer from "../layout/drawer/drawer";
import Main from "../pages/main/main";
import useData from "../hooks/useStore";
import SubHeader from "../layout/sub-header/sub-header";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="">
        <SideDrawer>
          <Header />
          <SubHeader />
          <Switch>
            <Route path="/" component={() => <Main />} />
          </Switch>
        </SideDrawer>
      </div>
    </BrowserRouter>
  );
};

export default Router;
