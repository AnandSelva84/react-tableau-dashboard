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
  editFilterState,
  applyFilters,
  setCurrentMainFilter,
  setLogoUrl,
} from "../../redux/actions/shared";
import response from "../../models/getInfo";
import HomePage from "../home/home";
import { fromOptionsToChips } from "../../redux/methods/re-format-response";
import CustomSelect from "../../components/custom-auto-complete/custom-auto-complete";
import MainSwitch from "../../components/main-switch/main-switch";
import Snackbar from "../../components/snackbar/snackbar";

const Main = React.memo(() => {
  const dispatch = useDispatch();

  const fullURL = window.location.href;
  const {
    filters: Filters,
    newFilters,
    filterState,
    currentMainFilter,
    dataFetched,
    app: App,
    appIsLoading,
  } = useData().sharedReducer;

  const domain = fullURL.substring(
    fullURL.lastIndexOf(":") + 1,
    fullURL.lastIndexOf("/")
  );

  const app = domain === "3000" ? "amp" : "kid";

  //Change this to get css class from api and apply background
  const mainStyle = app === "amp" ? "" : "dark";
  const style = !!app ? mainStyle : "no-data";

  return (
    <div className={style}>
      {appIsLoading && <LaodingScreen />}
      {!!App && !appIsLoading && <HomePage />}
      <Snackbar />
    </div>
  );
});

export default Main;
