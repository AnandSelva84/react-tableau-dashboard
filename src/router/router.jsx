import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../layout/header";
import SideDrawer from "../layout/drawer";
import Main from "../pages/main/main";
import useData from "../hooks/useStore";

const Router = () => {
  const { currentApp } = useData().sharedReducer;

  return (
    <BrowserRouter>
      <div className="">
        <SideDrawer>
          <Header />
          <Switch>
            <Route path="/" component={() => <Main />} />
          </Switch>
        </SideDrawer>
      </div>
    </BrowserRouter>
  );
};

export default Router;
