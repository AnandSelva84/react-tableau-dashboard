import React from "react";
import "./navigator.css";
import {
  HomeOutlined,
  FolderOpenOutlined,
  HelpOutlineOutlined,
} from "@material-ui/icons";
import ClickableIcon from "../icon-button";
import { colors } from "../../constants/colors";
import useData from "../../hooks/useStore";
import LetterGroup from "./letter-group";
import { useHistory } from "react-router-dom";
import { getRouteById } from "../../redux/methods/panel-pocessing";
import { PropTypes } from "prop-types";

const Naviagtor = (props) => {
  const { panels, app } = props;
  const { all_views } = app;
  const { currentLocation } = useData().sharedReducer;
  const titles = panels.panel_definitions.map((p) => p.panel_header_title);
  const isActiveArray = panels.panel_definitions.map((p) => p.is_active);
  const panelsLetters = titles.map((word) => word[0]);
  const routes = panels.panel_definitions.map((panel) =>
    getRouteById(all_views, panel.title_action_code)
  );
  const history = useHistory();
  const onHomeClicked = () => {
    history.push("/");
  };

  return (
    <>
      <div
        className="nav-wrapper"
        style={{ backgroundColor: colors.usaa_blue }}
      >
        <div className="">
          <ClickableIcon
            onClick={onHomeClicked}
            icon={<HomeOutlined />}
            style={{ color: "#fff" }}
          />
        </div>
        <div className="nav-hero-title">
          <p>{currentLocation || ""}</p>
          <LetterGroup
            letters={panelsLetters}
            titles={titles}
            routes={routes}
            isActiveArray={isActiveArray}
          />
        </div>
        <div className="" style={{ display: "flex" }}>
          <ClickableIcon
            style={{ color: "#fff" }}
            onClick={() => {}}
            icon={<HelpOutlineOutlined />}
          />
          <ClickableIcon
            onClick={() => {}}
            icon={<FolderOpenOutlined />}
            style={{ color: "#fff" }}
          />
        </div>
      </div>
    </>
  );
};

Naviagtor.propTypes = {
  app: PropTypes.any,
  panels: PropTypes.any,
};

export default Naviagtor;
