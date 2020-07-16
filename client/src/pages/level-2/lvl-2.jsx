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
} from "../../redux/methods/panel-pocessing";
// import TableauViz from "../report/report";

const LVL_2 = (props) => {
  debugger;
  let { id: route } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { app, panels } = useData().sharedReducer;
  const { all_views } = app;

  const { id } = getViewDataByRoute(route, all_views);

  const panel = panels.find((panel) => panel.title_action_code === id);

  const panelValues = panel.embedded_fields[0].embedded_field_options;

  // const allEmbeded = panel.embedded_fields
  // .map((p) => p.embedded_field_options)
  // .flat()

  // const siblings = getAllSiblings(route, all_views);

  const tableauGraph = route === "storyDeliveryTime";

  const getPanelData = () => {
    // let found = focus_area.find((panel) => panel.route === route);
    // console.log("panel data", found);
    // if (!!!found) found = { items: [] };
    // return found;
  };

  React.useEffect(() => {
    !!route && dispatch(setCurrentLocation(getPanel(route)?.title || ""));
  }, [route]);

  const handleClick = (value) => {
    history.push({
      pathname: `/${value.route}`,
    });
  };

  return (
    <>
      {!!panel && (
        <div className="ampBody">
          {[].map((item, index) => (
            <div
              className="panel"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "50vh",
              }}
              onClick={() => alert("click")}
            >
              {!!item?.level2_action_url && (
                <TableauViz
                  options={{ height: "35vh" }}
                  url={item.level2_action_url}
                  onClick={() => handleClick(item)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LVL_2;
