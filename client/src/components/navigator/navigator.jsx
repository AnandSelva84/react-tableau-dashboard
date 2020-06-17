import React from "react";
import "./navigator.css";
import { HomeOutlined, FolderOpenOutlined } from "@material-ui/icons";
import ClickableIcon from "../icon-button";
const Naviagtor = () => {
  return (
    <>
      <div className="nav-wrapper">
        <div className="">
          <ClickableIcon
            onClick={() => {}}
            icon={<HomeOutlined />}
            style={{ color: "#fff" }}
          />
        </div>
        <div className="nav-hero-title">
          <p>Application Development</p>
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
