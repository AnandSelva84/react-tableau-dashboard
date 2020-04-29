import React from "react";
import useData from "../../hooks/useStore";
import AgileMetrics from "../amp/amp";
import KeyIndicators from "../kid/kid";
import "./main.css";
import useQuery from "../../hooks/useQuery";

const Main = () => {
  const { currentApp } = useData().sharedReducer;

  const query = useQuery();
  const app = query.get("app");
  let DataToRender;

  if (!!app) {
    DataToRender =
      app === "amp" ? () => <AgileMetrics /> : () => <KeyIndicators />;
  } else {
    DataToRender = () => <div>No Data To View!</div>;
  }
  const mainStyle = app === "amp" ? "" : "dark";
  const style = !!app ? mainStyle : "no-data";

  return (
    <div className={style}>
      <DataToRender />
    </div>
  );
};

export default Main;
