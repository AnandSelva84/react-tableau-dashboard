import React from "react";
import "./avatar.css";
import img from "../../assets/images/Head-512.png";

const HomeAvatar = () => (
  <div className="logo">
    <img src={img} alt="panda img" style={{ width: "48px", height: "auto" }} />
  </div>
);

export default HomeAvatar;
