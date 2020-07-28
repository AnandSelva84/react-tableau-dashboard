import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Button from "../../components/button/button";
import { useDispatch } from "react-redux";
import { pushHistory, setCurrentLocation } from "../../redux/actions/shared";
import useData from "../../hooks/useStore";
import { getPanel } from "../../redux/methods/get-level";
import TableauViz from "../../components/report/report";
import { reportsUrls } from "../../data/reports-urls";
import {
  getAllSiblings,
  getViewDataByRoute,
  filterMappingResult,
} from "../../redux/methods/panel-pocessing";
import "./level-2.css";
// import TableauViz from "../report/report";
import { getViewData } from "./../../redux/methods/panel-pocessing";

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

  const handleClick = (value) => {
    history.push({
      pathname: `/${value.route}`,
    });
  };

  const filterMapping = (url) =>
    props.getVizDataByUrl(url).embedded_viz[0].filter_mapping;

  const panelHeaderTitle = (url) =>
    props.getVizDataByUrl(url).panel_header_title;

  const handleTitleClick = (singlePanel, index) => {
    history.push(`./storyDeliveryLeadTime`);

    const { view_id } = singlePanel;
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

    // debugger;
    // const found = all_views.find((p) => p.route === route);
    // const { id } = found;
    // const mainPanelData = panels.find((p) => p.title_action_code === id);
    // const embededFeilds = mainPanelData.embedded_fields;
    // const { value } = embededFeilds[0].embedded_field_options[index];
  };

  return (
    <>
      {!!vizUrls && (
        <div className="ampBody">
          {mlutiReportData.map((singlePanel, index) => (
            <div className="panel">
              <div className="panel-title no-clickable">
                <span
                  onClick={() => {
                    filterMapping(singlePanel);
                  }}
                >
                  {singlePanel.panel_header_title}
                </span>

                <h3
                  className="report-link"
                  onClick={() => handleTitleClick(singlePanel, index)}
                >
                  View Report
                </h3>
              </div>

              <TableauViz
                options={{ height: "50vh" }}
                url={singlePanel.embedded_viz[0].embed_url}
                filterMappingResult={filterMappingResult}
                filterMapping={filterMapping(
                  singlePanel.embedded_viz[0].embed_url
                )}
                hideToolbar={true}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LVL_2;
