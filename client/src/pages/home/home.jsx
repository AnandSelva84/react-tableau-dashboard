import React from "react";
import "../loading/laoding.css";
import "./home.css";
import useData from "../../hooks/useStore";
import Button from "../../components/button/button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pushHistory } from "../../redux/actions/shared";
import { panels } from "../../data/panels_new";
const Panel = (props) => {
  const history = useHistory();

  const reformatPath = (path) => {
    return path.split(" ").join("_");
  };
  return (
    <div className="panel">
      <div
        className="panel-title"
        onClick={() => {
          history.push({
            pathname: `/${props.route}`,
            state: { ...props },
          });
        }}
      >
        {props?.title || ""}
      </div>
      <div className="panel-content">
        {props?.items.map((item) => (
          <div
            className=""
            onClick={() => {
              history.push({
                pathname: `/${item.route}`,
                state: { ...item },
              });
            }}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { body_class } = useData().sharedReducer;
  const css_class = body_class === "ampBody" ? "ampBody" : "kidBody";
  return (
    <div className="panel-wrapper">
      {/* {!!!body_class && <div className="home">Coming Soon...</div>} */}
      {!!css_class && panels.map((panel) => <Panel {...panel} />)}
    </div>
  );
};
export default HomePage;

{
  /* <div className={css_class}>
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
</div> */
}
