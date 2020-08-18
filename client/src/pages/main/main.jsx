import React from "react";
import useData from "../../hooks/useStore";
import "../amp/amp.css";
import "./main.css";
import LaodingScreen from "../../components/loading/loading";

import HomePage from "../home/home";

const Main = () => {
  const { app: App, appIsLoading } = useData().sharedReducer;

  return (
    <>
      {appIsLoading && <LaodingScreen />}
      {!!App && !appIsLoading && <HomePage />}
    </>
  );
};

export default Main;
