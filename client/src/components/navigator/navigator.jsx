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
import { panels } from "../../data/panels_new";
import LetterGroup from "./letter-group";
const Naviagtor = () => {
  const { currentLocation } = useData().sharedReducer;
  const panelsLetters = panels.map((p) => p.title).map((word) => word[0]);

  return (
    <>
      <div
        className="nav-wrapper"
        style={{ backgroundColor: colors.usaa_blue }}
      >
        <div className="">
          <ClickableIcon
            onClick={() => {}}
            icon={<HomeOutlined />}
            style={{ color: "#fff" }}
          />
        </div>
        <div className="nav-hero-title">
          <p>{currentLocation || ""}</p>
          <LetterGroup letters={panelsLetters} panels={panels} />
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

export default Naviagtor;
