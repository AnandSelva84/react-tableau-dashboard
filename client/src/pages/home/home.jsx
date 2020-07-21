import React, { useEffect } from "react";
import "../loading/laoding.css";
import "./home.css";
import useData from "../../hooks/useStore";
import Button from "../../components/button/button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pushHistory } from "../../redux/actions/shared";
import { panels } from "../../data/panels_new";
import { getViewData } from "./../../redux/methods/panel-pocessing";
import { setCurrentLocation } from "./../../redux/actions/shared";
const Panel = (props) => {
  const history = useHistory();

  const { all_views, panel } = props;
  const { title_action_code: panelId } = panel;

  const allEmbeded = panel.embedded_fields
    .map((p) => p.embedded_field_options)
    .flat();

  if (!!!allEmbeded) return null;

  const viewData = (id) => getViewData(id, all_views);

  const getRoute = (id) => {
    const { route } = viewData(id);
    return route;
  };

  return (
    <div className="panel">
      <div
        className="panel-title"
        onClick={() => {
          history.push({
            pathname: `/${getRoute(panelId)}`,
          });
        }}
      >
        {panel?.panel_header_title || ""}
      </div>
      <div className="panel-content">
        {allEmbeded.map(({ text, value }) => (
          <div
            className=""
            onClick={() => {
              history.push({
                pathname: `/${getRoute(value)}`,
              });
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = (props) => {
  const { app, panels = [] } = useData().sharedReducer;
  const { all_views = [] } = app;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!app) dispatch(setCurrentLocation(app?.subject_area[0]?.name));
  }, []);

  return (
    <div className="panel-wrapper">
      {!!panels &&
        panels.map((panel) => <Panel panel={panel} all_views={all_views} />)}
    </div>
  );
};
export default HomePage;
