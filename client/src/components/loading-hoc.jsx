import React from "react";
import useData from "./../hooks/useStore";
import LaodingScreen from "./loading/loading";
import NoData from "./../pages/no-data/noData";

export default function LoadingWrapper(Component) {
  const { app, panels, appIsLoading } = useData().sharedReducer;

  return (
    <>
      {app && panels && <Component />}
      {!app && appIsLoading && <LaodingScreen />}
      {!app && !appIsLoading && <NoData />}
    </>
  );
}
