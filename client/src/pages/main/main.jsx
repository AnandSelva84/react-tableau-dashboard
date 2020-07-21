import React, { useEffect, useState } from "react";
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
  setCurrentLocation,
} from "../../redux/actions/shared";
import response from "../../models/getInfo";
import HomePage from "../home/home";
import { fromOptionsToChips } from "../../redux/methods/re-format-response";
import CustomSelect from "../../components/custom-auto-complete/custom-auto-complete";
import MainSwitch from "../../components/main-switch/main-switch";
import Snackbar from "../../components/snackbar/snackbar";
import { getDomain } from "../../enviroment/domain";
import useSwitchFetch from "../../hooks/switch-useFetch";

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

  // const app = domain === "3000" ? "amp" : "kid";
  const app = getDomain();

  //Change this to get css class from api and apply background
  const mainStyle = app === "amp" ? "" : "dark";
  const style = !!app ? mainStyle : "no-data";

  // React.useEffect(() => {
  //   !!App?.application?.name &&
  //     dispatch(setCurrentLocation(App?.subject_area?.name));
  // }, [App]);

  return (
    <div className={style}>
      {appIsLoading && <LaodingScreen />}
      {!!App && !appIsLoading && <HomePage />}
    </div>
  );
});

export default Main;
