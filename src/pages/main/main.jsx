import React from "react";
import useData from "../../hooks/useStore";
import AgileMetrics from "../amp/amp";
import KeyIndicators from "../kid/kid";
import "./main.css";

const Main = () => {
  const { currentApp } = useData().sharedReducer;
  console.log("current App is ", currentApp);

  const DataToRender =
    currentApp === "amp" ? () => <AgileMetrics /> : () => <KeyIndicators />;

  const style = currentApp === "amp" ? "" : "dark";

  return (
    <div className={style} style={{ padding: "0 0rem" }}>
      <DataToRender />
    </div>
  );
};

export default Main;
