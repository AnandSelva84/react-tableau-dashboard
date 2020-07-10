import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Button from "../../components/button/button";
import { useDispatch } from "react-redux";
import { pushHistory, setCurrentLocation } from "../../redux/actions/shared";
import useData from "../../hooks/useStore";
import { getPanel } from "../../redux/methods/get-level";
import TableauViz from "../../components/report/report";
import { reportsUrls } from "../../data/reports-urls";
// import TableauViz from "../report/report";

const LVL_2 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { currentLocation, app } = useData().sharedReducer;
  // !!state && alert(JSON.stringify({ ...state }));

  let { id } = useParams();
  const { focus_area } = app;
  const tableauGraph = id === "storyDeliveryTime";

  const getPanelData = () => {
    let found = focus_area.find((panel) => panel.route === id);
    console.log("panel data", found);
    if (!!!found) found = { items: [] };
    return found;
  };

  React.useEffect(() => {
    !!id && dispatch(setCurrentLocation(getPanel(id)?.title || ""));
  }, [id]);

  const handleClick = (value) => {
    history.push({
      pathname: `/${value.route}`,
    });
  };

  return (
    <>
      <div className="ampBody">
        {getPanelData().items.map((item, index) => (
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
    </>
  );
};

export default LVL_2;
