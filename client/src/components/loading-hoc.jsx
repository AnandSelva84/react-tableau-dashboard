import React from "react";
import useData from "./../hooks/useStore";
import LaodingScreen from "./loading/loading";

export default function LoadingWrapper(Component) {
  const { app } = useData().sharedReducer;
  return (
    <>
      {!!app && <Component />}
      {!!!app && <LaodingScreen />}
    </>
  );
}
