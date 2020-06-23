import React from "react";
import logo from "../../assets/images/ampLogo.png";
const Logo = (props) => {
  const { url } = props;
  //   const img = require(url);
  return (
    <>
      {!!url && (
        <div style={{ maxWidth: "4rem", height: "100%" }}>
          <img
            src={require("../../assets/images/ampLogo.png")}
            alt="panda img"
            style={{ width: "5.5rem", height: "auto" }}
          />
        </div>
      )}
    </>
  );
};

export default Logo;
