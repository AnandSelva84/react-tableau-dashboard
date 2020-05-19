import React, { useEffect } from "react";
import useData from "../../hooks/useStore";
import AgileMetrics from "../amp/amp";
import KeyIndicators from "../kid/kid";
import "./main.css";
import useQuery from "../../hooks/useQuery";
import useFetch from "../../hooks/useFetch";
import { getInfoURL, getFilters, newFiltersURL } from "../../enviroment/urls";
import LaodingScreen from "../../components/loading/loading";
import { useDispatch } from "react-redux";
import {
  setAppLoading,
  setApp,
  setFilters,
  setBodyClass,
} from "../../redux/actions/shared";
import response from "../../models/getInfo";
import HomePage from "../home/home";

const Main = React.memo(() => {
  const dispatch = useDispatch();

  const { data: filters, loading: filtersLoading } = useFetch(newFiltersURL);
  const fullURL = window.location.href;

  const domain = fullURL.substring(
    fullURL.lastIndexOf(":") + 1,
    fullURL.lastIndexOf("/")
  );

  const app = domain === "3000" ? "amp" : "kid";
  const { data, loading } = useFetch(`${getInfoURL}/${app}`);

  //Change this to get css class from api and apply background
  const mainStyle = app === "amp" ? "" : "dark";
  const style = !!app ? mainStyle : "no-data";

  useEffect(() => {
    if (!!data && !loading) {
      dispatch(setAppLoading(false));
      dispatch(setApp(data.data));
      dispatch(setBodyClass(data.data.application.body_class));
    } else {
      dispatch(setAppLoading(true));
    }
  }, [data, loading]);

  useEffect(() => {
    if (!!filters && !filtersLoading) dispatch(setFilters(filters.filters));
  }, [filters, filtersLoading]);

  return (
    <div className={style}>
      {loading && <LaodingScreen />}
      {!!data && !loading && <HomePage data={data} />}
    </div>
  );
});

export default Main;
