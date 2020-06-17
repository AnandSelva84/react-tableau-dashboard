import React from "react";
import {
  BookmarkBorder,
  SaveOutlined,
  HelpOutlineOutlined,
} from "@material-ui/icons";
import ClickableIcon from "../icon-button";
import "./tool-bar.css";

const ToolBar = () => {
  return (
    <div className="" style={{ display: "flex", justifyContent: "flex-end" }}>
      <div className="tool-wrapper">
        <ClickableIcon onClick={() => {}} icon={<BookmarkBorder />} />
        <ClickableIcon onClick={() => {}} icon={<SaveOutlined />} />
        <ClickableIcon onClick={() => {}} icon={<HelpOutlineOutlined />} />
      </div>
    </div>
  );
};

export default ToolBar;
