import React, { useEffect } from "react";
import useData from "../../hooks/useStore";
import AgileMetrics from "../amp/amp";
import KeyIndicators from "../kid/kid";
import "./main.css";
import useQuery from "../../hooks/useQuery";
import useFetch from "../../hooks/useFetch";
import { getInfoURL } from "../../enviroment/urls";
import LaodingScreen from "../../components/loading/loading";
import { useDispatch } from "react-redux";
import { setAppLoading, setApp } from "../../redux/actions/shared";
import response from "../../models/getInfo";

const Main = React.memo(() => {
  // const { currentApp } = useData().sharedReducer;
  const dispatch = useDispatch();
  const { data, loading } = useFetch(getInfoURL);

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

  useEffect(() => {
    if (!!data && !loading) {
      dispatch(setAppLoading(false));
      dispatch(setApp(data.data));
    } else {
      dispatch(setAppLoading(true));
    }
  }, [data, loading]);

  return (
    <div className={style}>
      {loading && <LaodingScreen />}
      {!!data && !loading && <DataToRender />}
    </div>
  );
});

export default Main;
