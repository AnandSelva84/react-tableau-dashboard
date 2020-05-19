import React from "react";
import "../loading/laoding.css";
import "./home.css";
import useData from "../../hooks/useStore";

const HomePage = (props) => {
  const state = useData();

  const { body_class } = useData().sharedReducer;
  const css_class = body_class === "ampBody" ? "ampBody" : "kidBody";
  return (
    <>
      {/* {!!!body_class && <div className="home">Coming Soon...</div>} */}
      {!!css_class && (
        <div className={css_class}>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
          <div className="panel"></div>
        </div>
      )}
    </>
  );
};
export default HomePage;
