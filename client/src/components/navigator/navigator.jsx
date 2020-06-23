import React from "react";
import "./navigator.css";
import {
  HomeOutlined,
  FolderOpenOutlined,
  HelpOutlineOutlined,
} from "@material-ui/icons";
import ClickableIcon from "../icon-button";
import { colors } from "../../constants/colors";
const Naviagtor = () => {
  return (
    <>
      <div className="nav-wrapper" style={{ backgroundColor: colors.usaa_blue }}>
        <div className="">
          <ClickableIcon
            onClick={() => { }}
            icon={<HomeOutlined />}
            style={{ color: "#fff" }}
          />
        </div>
        <div className="nav-hero-title">
          <p>Application Development</p>
        </div>
        <div className="">
          <ClickableIcon
            style={{ color: "#fff" }}
            onClick={() => { }}
            icon={<HelpOutlineOutlined />}
          />
        </div>
        <div className="">
          <ClickableIcon
            onClick={() => { }}
            icon={<FolderOpenOutlined />}
            style={{ color: "#fff" }}
          />
        </div>
      </div>
    </>
  );
};

export default Naviagtor;
