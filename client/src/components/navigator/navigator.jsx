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
const Naviagtor = () => {
  const { currentLocation } = useData().sharedReducer;

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
        </div>
        <div className="">
          <ClickableIcon
            style={{ color: "#fff" }}
            onClick={() => {}}
            icon={<HelpOutlineOutlined />}
          />
        </div>
        <div className="">
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
