import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../layout/header/header";
import SideDrawer from "../layout/drawer/drawer";
import Main from "../pages/main/main";
import useData from "../hooks/useStore";
import SubHeader from "../layout/sub-header/sub-header";
import LVL_3 from "../pages/lvl-3/lvl-3";
import LVL_2 from "../pages/lvl-2/lvl-2";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="">
        <SideDrawer>
          <Header />
          <SubHeader />
          <Switch>
            <Route exact path="/" component={() => <Main />} />
            <Route exact path="/lvl3" component={() => <LVL_3 />} />
            <Route exact path="/lvl2" component={() => <LVL_2 />} />
          </Switch>
        </SideDrawer>
      </div>
    </BrowserRouter>
  );
};

export default Router;
