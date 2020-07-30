import React from "react";
import "./index.css";
import { useLocation } from "react-router-dom";

export default function Footer(props) {
  const { pathname } = useLocation();

  const showCondition = pathname === "/";

  return (
    <>
      <div className="footer">
        <div className="">Copyright &#169; 2020 USAA</div>
        <div className="">
          FOR INTERNAL USE ONLY - May be shared with USAA employees only.
        </div>
      </div>
    </>
  );
}
