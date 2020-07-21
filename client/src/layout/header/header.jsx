import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import ClickableIcon from "../../components/icon-button";
import theme from "../../theme/layout";
import "./header.css";
import { useDispatch } from "react-redux";
import {
  toggleDrawer,
  setApp,
  setDarkMode,
  applyFilters,
  setLogoUrl,
  setBodyClass,
  setAppLoading,
  setCurrentMainFilter,
  setFilters,
  setCurrentLocation,
  setPanelDefinitions,
} from "../../redux/actions/shared";
import useQuery from "../../hooks/useQuery";
import useData from "../../hooks/useStore";
import response from "../../models/getInfo";
import { useHistory } from "react-router-dom";
import Navigator from "../../components/navigator/navigator";
import HomeAvatar from "../../components/avatar/avatar";
import Logo from "./logo";
import { colors } from "../../constants/colors";
import useFetch from "../../hooks/useFetch";
import { newFiltersURL, getInfoURL, getPanelDefs } from "../../enviroment/urls";
import { getDomain } from "../../enviroment/domain";
import useSwitchFetch from "../../hooks/switch-useFetch";

const Header = () => {
  const dispatch = useDispatch();
  const fullURL = window.location.href;
  const { header, darkHeader } = theme;
  const {
    darkMode,
    appIsLoading,
    app: appData,
    filterState,
    logoUrl,
    currentMainFilter,
    currentLocation,
  } = useData().sharedReducer;
  console.log("initial ", filterState);

  const domain = fullURL.substring(
    fullURL.lastIndexOf(":") + 1,
    fullURL.lastIndexOf("/")
  );

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

  const app = getDomain();
  const history = useHistory();

  const { data, loading } = useFetch(`${getInfoURL}/${app}`);
  const { data: filters, loading: filtersLoading } = useFetch(newFiltersURL);
  const { data: panels, loading: panelsLoading } = useSwitchFetch(
    `${getPanelDefs}/${appData?.application?.id}`,
    !!appData
  );

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

  useEffect(() => {
    setLoaded(true);
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    console.log("savedFilters", savedFilters);

    if (!!savedFilters && savedFilters.length > 0) {
      dispatch(applyFilters([...savedFilters]));
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
    if (!!panels) {
      dispatch(setPanelDefinitions(panels.panel_definitions));
    }
  }, [!!panels, panelsLoading]);

  React.useEffect(() => {
    if (!!appData) {
      const { id } = appData.application;
      id === "KID" ? dispatch(setDarkMode(true)) : dispatch(setDarkMode(false));
    }
  }, [appData]);
  React.useEffect(() => {}, [logoUrl]);

  // React.useEffect(() => {
  //   !!app?.title && dispatch(setCurrentLocation(app.title));
  // }, []);

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

  useEffect(() => {
    if (!!filters && !filtersLoading) dispatch(setFilters(filters.filters));
  }, [filters, filtersLoading]);

  const onLogoClicked = () => {
    if (history.location.pathname !== "/") history.push("/");
  };

  const StyledTitle = (props) => {
    const subTitles = props.title.split(" ");
    return (
      <div style={{ display: "flex" }}>
        {subTitles.map((singleTitle, index) => (
          <div
            className=""
            style={{
              color: index % 2 === 0 ? "rgb(208,207,206)" : colors.usaa_blue,
            }}
          >
            {singleTitle}
          </div>
        ))}
      </div>
    );
  };

  const dark = !darkMode ? null : darkHeader;
  return (
    <>
      {!!appData?.application?.name && (
        <Paper style={{ ...header, ...dark, borderRadius: "0" }}>
          <div className="left-side">
            <div className="" style={{ display: "flex", alignItems: "center" }}>
              <Logo url={logoUrl} />
              <div onClick={onLogoClicked} className="header-title">
                <StyledTitle title={appData?.application?.name} />
              </div>
            </div>
          </div>
          {!!panels && <Navigator panels={panels} app={appData} />}
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
