import React from "react";
import useData from "./../hooks/useStore";
import LaodingScreen from "./loading/loading";

export default function LoadingWrapper(Component) {
  const { app, panels } = useData().sharedReducer;
  return (
    <>
      {app && panels && <Component />}
      {!app && panels && <LaodingScreen />}
    </>
  );
}
