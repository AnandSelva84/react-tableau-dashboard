import React from "react";
import {
  BookmarkBorder,
  SaveOutlined,
  HelpOutlineOutlined,
} from "@material-ui/icons";
import ClickableIcon from "../icon-button";
import "./tool-bar.css";
import NavigationBar from "../navigation-bar/navigation-bar";
import { useLocation } from "react-router-dom";

const ToolBar = () => {
  const { pathname } = useLocation();
  return (
    <div
      className=""
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <NavigationBar path={pathname} />
      <div className="tool-wrapper">
        <ClickableIcon onClick={() => {}} icon={<BookmarkBorder />} />
        <ClickableIcon onClick={() => {}} icon={<SaveOutlined />} />
        <ClickableIcon onClick={() => {}} icon={<HelpOutlineOutlined />} />
      </div>
    </div>
  );
};

export default ToolBar;
