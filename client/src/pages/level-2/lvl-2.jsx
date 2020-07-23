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
  const { vizUrls } = props;

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

  const handleTitleClick = (url, index) => {
    // debugger;
    const found = all_views.find((p) => p.route === route);
    const { id } = found;
    const mainPanelData = panels.find((p) => p.title_action_code === id);
    const embededFeilds = mainPanelData.embedded_fields;
    const { value } = embededFeilds[0].embedded_field_options[index];
    const panelById = all_views.find((p) => p.id === value);
    const { route: panelRoute } = panelById;
    history.push(`./${panelRoute}`);
  };

  return (
    <>
      {!!vizUrls && (
        <div className="ampBody">
          {vizUrls.map((url, index) => (
            <div className="panel">
              <div className="panel-title no-clickable">
                <span
                  onClick={() => {
                    filterMapping(url);
                  }}
                >
                  {panelHeaderTitle(url)}
                </span>

                <h3
                  className="report-link"
                  onClick={() => handleTitleClick(url, index)}
                >
                  View Report
                </h3>
              </div>

              <TableauViz
                options={{ height: "50vh" }}
                url={url}
                filterMappingResult={filterMappingResult}
                filterMapping={filterMapping(url)}
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
