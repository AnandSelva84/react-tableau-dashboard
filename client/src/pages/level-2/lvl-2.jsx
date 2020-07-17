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
import "./level-2.css";
// import TableauViz from "../report/report";

const LVL_2 = (props) => {
  let { id: route } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { app, panels } = useData().sharedReducer;
  const { all_views } = app;
  const { vizUrls } = props;
  React.useEffect(() => {
    !!route && dispatch(setCurrentLocation(getPanel(route)?.title || ""));
  }, [route]);

  const handleClick = (value) => {
    history.push({
      pathname: `/${value.route}`,
    });
  };

  const panelHeaderTitle = (url) => props.getVizDataByUrl(url);

  return (
    <>
      {!!vizUrls && (
        <div className="ampBody">
          {vizUrls.map((url, index) => (
            <div className="panel">
              <div className="panel-title">
                <h3>{panelHeaderTitle(url)}</h3>
              </div>

              <TableauViz options={{ height: "70vh" }} url={url} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LVL_2;
