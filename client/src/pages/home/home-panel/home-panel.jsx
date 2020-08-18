import React from "react";
import "./home-panel.css";
import { useHistory } from "react-router-dom";
import { getViewData } from "./../../../redux/methods/panel-pocessing";
import { PropTypes } from "prop-types";

export default function HomePanel(props) {
  const history = useHistory();
  const { all_views, panel } = props;
  const { title_action_code: panelId, panel_header_title, is_active } = panel;

  const allEmbeded = panel.embedded_fields
    .map((p) => p.embedded_field_options)
    .flat();

  if (!allEmbeded) return null;

  const viewData = (id) => getViewData(id, all_views);

  const getRoute = (id) => {
    const { route } = viewData(id);
    return route;
  };

  const handleTitleClick = () => {
    if (is_active)
      history.push({
        pathname: `/${getRoute(panelId)}`,
      });
  };

  const handleIsActive = (className) => {
    let newClassName = className;

    if (!is_active) newClassName = `${className} disabled`;
    return newClassName;
  };

  const handleUnitClick = (id) => {
    if (is_active)
      history.push({
        pathname: `/${getRoute(id)}`,
      });
  };

  return (
    <div className={handleIsActive("home-panel")}>
      <div className="reports-count">{allEmbeded.length}</div>
      <div
        className={handleIsActive("home-panel-title")}
        onClick={handleTitleClick}
      >
        {panel_header_title}
      </div>
      <div className="units-container">
        {allEmbeded.map(({ text, value: id }) => (
          <div
            className="panel-unit"
            onClick={() => handleUnitClick(id)}
            key={id}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

HomePanel.propTypes = {
  panel: PropTypes.object,
  all_views: PropTypes.any,
};
