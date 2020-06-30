import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Button from "../../components/button/button";
import { useDispatch } from "react-redux";
import { pushHistory, setCurrentLocation } from "../../redux/actions/shared";
import useData from "../../hooks/useStore";
import { getPanel } from "../../redux/methods/get-level";
import TableauViz from "../report/report";

const LVL_2 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { currentLocation } = useData().sharedReducer;
  // !!state && alert(JSON.stringify({ ...state }));

  let { id } = useParams();
  const tableauGraph = id === "storyDeliveryTime";

  React.useEffect(() => {
    !!id && dispatch(setCurrentLocation(getPanel(id)?.title || ""));
  }, [id]);

  return (
    <>
      <div className="ampBody">
        {props.items.map((value) => (
          <div
            className="panel"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: "50vh",
            }}
          >
            {value.route !== "storyDeliveryTime" ? (
              <div
                className="panel-content"
                onClick={() => {
                  debugger;
                  history.push({
                    pathname: `/${value.route}`,
                    state: { ...value },
                  });
                }}
              >
                {value.title}
              </div>
            ) : (
              <TableauViz options={{ height: "35vh" }} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default LVL_2;

{
  /* <Button
title="Navigate to Graph!"
style={{ backgroundColor: "#f4f4f4" }}
onClick={() => {
  history.push("/lvl3");
  dispatch(pushHistory({ path: "/lvl3", pathName: "Lvl 3" }));
}}
/> */
}

// <div className="panel"></div>
// <div className="panel"></div>
// <div className="panel"></div>
// <div className="panel"></div>
// <div className="panel"></div>
