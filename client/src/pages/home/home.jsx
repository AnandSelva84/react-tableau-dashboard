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
debugger
  const panel = props

  const allEmbeded = panel.embedded_fields.map(p => p.embedded_feild_options).flat()

  const allEmbededOptions = allEmbeded.map(A =>({ text :  A.text } ))

  const reformatPath = (path) => {
    return path.split(" ").join("_");
  };
  return (
    <div className="panel">
      <div
        className="panel-title"
        onClick={() => {
          // history.push({
          //   pathname: `/${props.route}`,
          // });
        }}
      >
        {props?.panel_header_title || ""}
      </div>
      <div className="panel-content">
        {allEmbededOptions.map((item) => (
          <div
            className=""
            onClick={() => {
              history.push({
                pathname: `/${item?.text}`,
              });
            }}
          >
            {item?.text}
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = (props) => {
  const { body_class, app , panels = [] } = useData().sharedReducer;
  const dispatch = useDispatch();
  const history = useHistory();
  const focus_area = !!app ? app.focus_area : [];
  const css_class = body_class === "ampBody" ? "ampBody" : "kidBody";
  return (
    <div className="panel-wrapper">
      {/* {!!!body_class && <div className="home">Coming Soon...</div>} */}
      {!!panels && panels.map((panel) => <Panel {...panel} />)}
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
