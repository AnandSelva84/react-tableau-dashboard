import React from "react";
import useData from "../../hooks/useStore";
import "../amp/amp.css";
import "./main.css";
import LaodingScreen from "../../components/loading/loading";

import HomePage from "../home/home";

const Main = React.memo(() => {
  const { app: App, appIsLoading } = useData().sharedReducer;

  return (
    // <div className={style} style={{ height: "100%" }}>
    <>
      {appIsLoading && <LaodingScreen />}
      {!!App && !appIsLoading && <HomePage />}
    </>
    /* </div> */
  );
});

export default Main;
