import React from "react";
import { Paper } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import ClickableIcon from "../../components/icon-button";
import theme from "../../theme/layout";
import "./header.css";
import { useDispatch } from "react-redux";
import { toggleDrawer, setApp, setDarkMode } from "../../redux/actions/shared";
import useQuery from "../../hooks/useQuery";
import useData from "../../hooks/useStore";
import response from "../../models/getInfo";
import { useHistory } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { header, darkHeader } = theme;
  const {
    darkMode,
    appIsLoading,
    app: appData,
    filterState,
  } = useData().sharedReducer;
  console.log("initial ", filterState);

  const history = useHistory();

  React.useEffect(() => {
    if (!!appData) {
      const { id } = appData.application;
      id === "KID" ? dispatch(setDarkMode(true)) : dispatch(setDarkMode(false));
    }
  }, [appData]);

  const onLogoClicked = () => {
    if (history.location.pathname !== "/") history.push("/");
  };

  // const appName = app === "amp" ? "Agile Metrics Panel" : "Key Indicators";
  const dark = !darkMode ? null : darkHeader;
  return (
    <>
      {!!appData && !appIsLoading && (
        <Paper style={{ ...header, ...dark, borderRadius: "0" }}>
          <div className="left-side">
            <ClickableIcon
              icon={<Menu />}
              onClick={() => {
                dispatch(toggleDrawer());
              }}
            />
            <div onClick={onLogoClicked} className="header-title">
              {appData.application.name}
            </div>
          </div>
          <div className="header-title hello">hello panda</div>
        </Paper>
      )}
    </>
  );
};

export default Header;
