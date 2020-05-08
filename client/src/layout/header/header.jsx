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
import img from "../../assets/img/wp2471777.jpg";
import response from "../../models/getInfo";

const Header = () => {
  const dispatch = useDispatch();
  const { header, darkHeader } = theme;
  const { darkMode, appIsLoading, app: appData } = useData().sharedReducer;
  const query = useQuery();
  const app = query.get("app");

  React.useEffect(() => {
    app === "kid" ? dispatch(setDarkMode(true)) : dispatch(setDarkMode(false));
  }, [app]);

  // const appName = app === "amp" ? "Agile Metrics Panel" : "Key Indicators";
  debugger;
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
            <div className="header-title">{appData.application.name}</div>
          </div>
          <div className="header-title hello">hello panda</div>
        </Paper>
      )}
    </>
  );
};

export default Header;
