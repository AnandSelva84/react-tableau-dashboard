import React from "react";
import "../loading/laoding.css";
import "./home.css";
import useData from "../../hooks/useStore";
import Button from "../../components/button/button";
import { useHistory } from "react-router-dom";

const HomePage = (props) => {
  const state = useData();
  const history = useHistory();
  const { body_class } = useData().sharedReducer;
  const css_class = body_class === "ampBody" ? "ampBody" : "kidBody";
  return (
    <>
      {/* {!!!body_class && <div className="home">Coming Soon...</div>} */}
      {!!css_class && (
        <div className={css_class}>
          <div className="panel">
            <Button
              title="Check Lvl 3"
              style={{ backgroundColor: "#f4f4f4" }}
              onClick={() => {
                history.push("/lvl3");
              }}
            />
          </div>
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
