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
} from "../../redux/actions/shared";
import response from "../../models/getInfo";
import HomePage from "../home/home";
import { fromOptionsToChips } from "../../redux/methods/re-format-response";
import CustomSelect from "../../components/custom-auto-complete/custom-auto-complete";
import MainSwitch from "../../components/main-switch/main-switch";
import Snackbar from "../../components/snackbar/snackbar";

const Main = React.memo(() => {
  const dispatch = useDispatch();

  const { data: filters, loading: filtersLoading } = useFetch(newFiltersURL);
  const fullURL = window.location.href;
  const {
    filters: Filters,
    newFilters,
    filterState,
    currentMainFilter,
    dataFetched,
  } = useData().sharedReducer;
  const chosenIds = filterState.map((filter) => filter.ID) || [];

  const domain = fullURL.substring(
    fullURL.lastIndexOf(":") + 1,
    fullURL.lastIndexOf("/")
  );

  const app = domain === "3000" ? "amp" : "kid";
  const { data, loading } = useFetch(`${getInfoURL}/${app}`);
  const [initialLoaded, setInitialLoaded] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [mainFilter, setMainFilter] = React.useState({
    ID: "Business",
    id: "Hierarchies",
    lvl: 0,
    parentId: null,
    value: "Business",
  });

  const savedFilters = JSON.parse(localStorage.getItem("filters"));

  React.useEffect(() => {
    const mainFilter =
      savedFilters?.find((f) => f.id === "Hierarchies")?.value || "Business";
    dispatch(setCurrentMainFilter(mainFilter));
  }, []);

  const getMainFilterAccordingToName = (name) => {
    const filter =
      name === "Business"
        ? {
            ID: "Business",
            id: "Hierarchies",
            lvl: 0,
            parentId: null,
            value: "Business",
          }
        : {
            ID: "Legacy",
            id: "Hierarchies",
            lvl: 0,
            parentId: null,
            value: "Legacy",
          };
    return filter;
  };

  //Change this to get css class from api and apply background
  const mainStyle = app === "amp" ? "" : "dark";
  const style = !!app ? mainStyle : "no-data";

  useEffect(() => {
    setLoaded(true);
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    console.log("savedFilters", savedFilters);

    if (!!savedFilters && savedFilters.length > 0) {
      // dispatch(editFilterState(savedFilters));
      dispatch(applyFilters(savedFilters));
    }
  }, []);

  useEffect(() => {
    if (!!data && !loading) {
      dispatch(setAppLoading(false));
      dispatch(setApp(data.data));
      dispatch(setBodyClass(data.data.application.app_body_css_class));
    } else {
      dispatch(setAppLoading(true));
    }
  }, [data, loading]);

  const getRidOfUnassigned = (filters) => {
    const afterFilter = filters.filter(
      (filter) =>
        !filter.values.map((f) => f.filter_display_text).includes("Bank")
    );
    console.log("after cut", afterFilter);

    return filters;
  };

  useEffect(() => {
    if (!!filters && !filtersLoading)
      dispatch(setFilters(getRidOfUnassigned(filters.filters)));
  }, [filters, filtersLoading]);

  React.useEffect(() => {
    // setInitialLoaded(false);
    if (loaded) {
      setInitialLoaded(false);
      console.log("current name al initial ", mainFilter);
      setMainFilter(getMainFilterAccordingToName(currentMainFilter));
      console.log(
        "current name al",
        getMainFilterAccordingToName(currentMainFilter)
      );
    }
  }, [currentMainFilter]);

  const format = (filter_id) => {
    const AfterMerge = newFilters.map((filter, index) => {
      const filterLvl = filter.level;
      return {
        ...filter,
        values: [
          ...filter.values,
          ...(Filters.filter(
            (toMerge, toMergeIndex) =>
              toMerge.level === filterLvl && toMergeIndex !== index
          )[0]?.values || []),
        ],
      };
    });

    const afterRefactor = AfterMerge.map((filter) => ({
      filterId: filter.filter_id,
      filterType: filter.filter_type,
      parentFilterId: filter.parent_filter,
      level: filter.level - 1,
      title: filter.title,
      values: [
        ...filter.values.map((value) => ({
          filterOptionId: value.filter_option,
          filter_value_text: value.filter_value,
          filter_display_text: value.filter_display_text,
          order: value.order,
          parentFilterOptionId: value.parent_filter_option,
        })),
      ],
    }));

    // console.log("hello ref", afterRefactor);
    let filterToReturn;
    afterRefactor.forEach((after) => {
      if (after.filterId === filter_id) {
        const a = after.values.filter((value) =>
          chosenIds.includes(value.parentFilterOptionId)
        );
        //you will get filtered values and after with be the chosen filter so return it -- a is values and after is filter
        console.log("Anew values for id ", after.filterId);
        // console.log("Anew values ", a);
        const afterChange = {
          ...after,
          values: [...a],
        };
        if (!!!a.length) {
          console.log("Anew filter in case no values ", {
            ...after,
            values: [],
          });
          filterToReturn = {
            ...after,
            values: [],
          };

          // return {
          //   ...after,
          //   values: [],
          // };
        }

        if (after.level === 0) {
          filterToReturn = { ...after };
        }
        if (a.length) {
          console.log("Anew filter in case there is  ", afterChange);
          filterToReturn = { ...afterChange };
          // return afterChange;
        }
      }
    });

    return filterToReturn;
  };

  return (
    <div className={style}>
      {loading && !!!newFilters && <LaodingScreen />}
      {!!data && !loading && <HomePage data={data} />}
      <Snackbar />
    </div>
  );
});

export default Main;
