import React from "react";
import logo from "../../assets/images/usaa.png";
import { PropTypes } from "prop-types";
const Logo = (props) => {
  const { url } = props;
  return (
    <>
      {url && (
        <div className="usaa-logo-container">
          <img
            src={logo}
            alt="usaa logo"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}
    </>
  );
};

Logo.propTypes = {
  url: PropTypes,
};

export default Logo;
