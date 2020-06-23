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
import Navigator from "../../components/navigator/navigator";
import HomeAvatar from "../../components/avatar/avatar";
import Logo from "./logo";
import { colors } from "../../constants/colors";

const Header = () => {
  const dispatch = useDispatch();
  const { header, darkHeader } = theme;
  const {
    darkMode,
    appIsLoading,
    app: appData,
    filterState,
    logoUrl,
  } = useData().sharedReducer;
  console.log("initial ", filterState);

  const history = useHistory();

  React.useEffect(() => {
    if (!!appData) {
      const { id } = appData.application;
      id === "KID" ? dispatch(setDarkMode(true)) : dispatch(setDarkMode(false));
    }
  }, [appData]);
  React.useEffect(() => {}, [logoUrl]);

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
            <ClickableIcon
              icon={<Menu />}
              onClick={() => {
                dispatch(toggleDrawer());
              }}
            />
            <div className="" style={{ display: "flex", alignItems: "center" }}>
              <Logo url={logoUrl} />
              <div onClick={onLogoClicked} className="header-title">
                <StyledTitle title={appData.application.name} />
              </div>
            </div>
          </div>
          <Navigator />
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
