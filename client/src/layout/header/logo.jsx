import React from "react";
import logo from "../../assets/images/usaa-logo.svg";
const Logo = (props) => {
  const { url } = props;
  //   const img = require(url);
  return (
    <>
      {!!url && (
        <div className="usaa-logo-container">
          <img
            src={logo}
            alt="panda img"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}
    </>
  );
};

export default Logo;
