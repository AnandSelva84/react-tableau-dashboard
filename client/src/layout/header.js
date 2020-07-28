import React from "react";
import { Paper } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import ClickableIcon from "../components/icon-button";
import theme from "../theme/layout";
import "./styles/header.css";
import { useDispatch } from "react-redux";
import { toggleDrawer, setApp } from "../redux/actions/shared";
import useData from "../hooks/useStore";
import useQuery from "../hooks/useQuery";

const Header = () => {
  const dispatch = useDispatch();
  const { header, darkHeader } = theme;
  const { currentApp } = useData().sharedReducer;

     const query = useQuery();


  const app = query.get("app");

  React.useEffect(() => {
    !!app ? dispatch(setApp(app)) : dispatch(setApp("none"));
  }, [app]);

  const appName =
    currentApp === "amp" ? "Agile Metrics Panel" : "Key Indicators";

  const dark = currentApp === "amp" ? null : darkHeader;
  return (
    <>
      <Paper style={{ ...header, ...dark, borderRadius: "0" }}>
        <div className="left-side">
          <ClickableIcon
            icon={<Menu />}
            onClick={() => {
              dispatch(toggleDrawer());
            }}
          />
          <div style={{ fontSize: "1.4rem", margin: "0 1rem" }}>{appName}</div>
        </div>
        <div style={{ fontSize: "1.4rem", margin: "0 1rem" }}>User Name</div>
      </Paper>
    </>
  );
};

export default Header;
