import React from "react";
import "../loading/laoding.css";
import "./home.css";
import useData from "../../hooks/useStore";
import Button from "../../components/button/button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pushHistory } from "../../redux/actions/shared";

const HomePage = (props) => {
  const dispatch = useDispatch();
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
              title="Click here!"
              style={{ backgroundColor: "#f4f4f4" }}
              onClick={() => {
                history.push("/lvl2");
                dispatch(pushHistory({ path: "/lvl2", pathName: "Lvl 2" }));
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
