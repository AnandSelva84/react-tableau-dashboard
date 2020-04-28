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

  const DataToRender =
    app === "amp" ? () => <AgileMetrics /> : () => <KeyIndicators />;

  const style = app === "amp" ? "" : "dark";

  return (
    <div className={style} style={{ padding: "0 0rem" }}>
      <DataToRender />
    </div>
  );
};

export default Main;
