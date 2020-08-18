import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentLocation } from "../../redux/actions/shared";
import useData from "../../hooks/useStore";
import { filterMappingResult } from "../../redux/methods/panel-pocessing";
import "./level-2.css";
import Panel from "./panel/panel";
import { PropTypes } from "prop-types";

const LVL_2 = (props) => {
  let { id: route } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { app, panels } = useData().sharedReducer;
  const { all_views } = app;
  const { vizUrls, mlutiReportData } = props;

  React.useEffect(() => {
    !!route && dispatch(setCurrentLocation(props.title));
  }, [route]);

  const filterMapping = (url) =>
    props.getVizDataByUrl(url).embedded_viz[0].filter_mapping;

  const handleTitleClick = (singlePanel, index) => {
    history.push(`./storyDeliveryLeadTime`);

    const parentPanel = all_views.find((p) => p.route === route);
    const { id: parentID } = parentPanel;
    const panelSiblings = panels.find(
      (panel) => panel.title_action_code === parentID
    ).embedded_fields[0].embedded_field_options;

    const panel = panelSiblings[index];
    const { value: panelId } = panel;
    const panelById = all_views.find((p) => p.id === panelId);
    const { route: panelRoute } = panelById;
    history.push(`./${panelRoute}`);
    return singlePanel;
  };

  return (
    <>
      {!!vizUrls && (
        <div className="ampBody">
          {mlutiReportData.map((singlePanel, index) => (
            <div className="panel" key={index}>
              <Panel
                index={index}
                singlePanel={singlePanel}
                filterMappingResult={filterMappingResult}
                filterMapping={filterMapping}
                handleTitleClick={handleTitleClick}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

LVL_2.propTypes = {
  vizUrls: PropTypes.any,
  mlutiReportData: PropTypes.any,
  title: PropTypes.any,
  getVizByUrl: PropTypes.func,
  getVizDataByUrl: PropTypes.func,
};

export default LVL_2;
