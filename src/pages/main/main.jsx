import React, { useEffect } from "react";
import useData from "../../hooks/useStore";
import AgileMetrics from "../amp/amp";
import KeyIndicators from "../kid/kid";
import "./main.css";
import useQuery from "../../hooks/useQuery";
import useFetch from "../../hooks/useFetch";
import { getInfoURL, getFilters } from "../../enviroment/urls";
import LaodingScreen from "../../components/loading/loading";
import { useDispatch } from "react-redux";
import { setAppLoading, setApp, setFilters } from "../../redux/actions/shared";
import response from "../../models/getInfo";

const Main = React.memo(() => {
  // const { currentApp } = useData().sharedReducer;
  const dispatch = useDispatch();
  const { data, loading } = useFetch(getInfoURL);
  const { data: filters, loading: filtersLoading } = useFetch(getFilters);
  const fullURL = window.location.href;

  React.useEffect(() => {
    const port = fullURL.substring(
      fullURL.lastIndexOf(":") + 1,
      fullURL.lastIndexOf("/")
    );
    // console.log('port');
    // debugger;
    alert(port);
  }, [fullURL]);

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

  useEffect(() => {
    if (!!filters && !filtersLoading) dispatch(setFilters(filters));
  }, [filters, filtersLoading]);

  return (
    <div className={style}>
      {loading && <LaodingScreen />}
      {!!data && !loading && <DataToRender />}
    </div>
  );
});

export default Main;
