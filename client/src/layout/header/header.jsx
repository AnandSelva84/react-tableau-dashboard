import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import theme from "../../theme/layout";
import "./header.css";
import { useDispatch } from "react-redux";
import {
  setApp,
  setDarkMode,
  applyFilters,
  setLogoUrl,
  setBodyClass,
  setAppLoading,
  setCurrentMainFilter,
  setFilters,
  setPanelDefinitions,
  setTimeFilters,
} from "../../redux/actions/shared";
import useData from "../../hooks/useStore";
import { useHistory, useLocation } from "react-router-dom";
import Navigator from "../../components/navigator/navigator";
import HomeAvatar from "../../components/avatar/avatar";
import Logo from "./logo";
import useFetch from "../../hooks/useFetch";
import { newFiltersURL, getInfoURL, getPanelDefs } from "../../enviroment/urls";
import { getDomain } from "../../enviroment/domain";
import useSwitchFetch from "../../hooks/switch-useFetch";
import StyledTitle from "../../components/styled-title/styled-title";
import { extractFilters } from "./../../redux/methods/filters-processing";

const Header = () => {
  const dispatch = useDispatch();
  const { header, darkHeader } = theme;
  const { app: appData, logoUrl, currentMainFilter } = useData().sharedReducer;

  const { pathname } = useLocation();

  const app = getDomain();
  const history = useHistory();

  const { data, loading } = useFetch(`${getInfoURL}/${app}`);
  const { data: filters, loading: filtersLoading } = useFetch(newFiltersURL);
  const { data: panels, loading: panelsLoading } = useSwitchFetch(
    `${getPanelDefs}/${appData?.application?.id}`,
    appData
  );

  const [loaded, setLoaded] = React.useState(false);

  const savedFilters = JSON.parse(localStorage.getItem("filters"));

  React.useEffect(() => {
    const mainFilter =
      savedFilters?.find((f) => f.id === "Hierarchies")?.value || "Business";
    dispatch(setCurrentMainFilter(mainFilter));
  }, []);

  useEffect(() => {
    setLoaded(true);
    const _savedFilters = JSON.parse(localStorage.getItem("filters"));

    if (!!_savedFilters && _savedFilters.length > 0) {
      dispatch(applyFilters([..._savedFilters]));
    }
  }, []);

  useEffect(() => {
    if (!!data && !loading) {
      dispatch(setAppLoading(false));
      dispatch(setApp(data.data));
      dispatch(setLogoUrl(data.data.application.logo_path_url));
      dispatch(setBodyClass(data.data.application.app_body_css_class));
    } else {
      dispatch(setAppLoading(true));
    }
  }, [data, loading]);

  useEffect(() => {
    if (panels) {
      dispatch(setPanelDefinitions(panels.panel_definitions));
    }
  }, [panels, panelsLoading]);

  React.useEffect(() => {
    if (appData) {
      const { id } = appData.application;
      id === "KID" ? dispatch(setDarkMode(true)) : dispatch(setDarkMode(false));
    }
  }, [appData]);
  React.useEffect(() => {}, [logoUrl]);

  React.useEffect(() => {
    if (loaded) {
      // setMainFilter(getMainFilterAccordingToName(currentMainFilter));
    }
  }, [currentMainFilter]);

  useEffect(() => {
    //  dispatch(setFilters(filters.filters));
    if (filters && !filtersLoading)
      dispatch(setFilters(extractFilters(filters).reportFilters));
    dispatch(setTimeFilters(extractFilters(filters).timeFilters));
  }, [filters, filtersLoading]);

  const onLogoClicked = () => {
    if (history.location.pathname !== "/") history.push("/");
  };

  return (
    <>
      {appData?.application?.name && (
        <Paper style={{ ...header, ...darkHeader, borderRadius: "0" }}>
          <div className="left-side">
            <div className="" style={{ display: "flex", alignItems: "center" }}>
              <Logo url={logoUrl} />
              <div onClick={onLogoClicked} className="header-title">
                <StyledTitle
                  title={appData?.application?.name}
                  middleColor="yellow"
                />
              </div>
            </div>
          </div>
          {panels && pathname !== "/" && (
            <Navigator panels={panels} app={appData} />
          )}
          <div className="logo-side">
            <HomeAvatar />
            <div className="header-title hello">Hello Panda</div>
          </div>
        </Paper>
      )}
    </>
  );
};

export default Header;
