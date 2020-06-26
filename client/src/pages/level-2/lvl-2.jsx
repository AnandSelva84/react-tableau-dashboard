import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Button from "../../components/button/button";
import { useDispatch } from "react-redux";
import { pushHistory, setCurrentLocation } from "../../redux/actions/shared";
import useData from "../../hooks/useStore";

const LVL_2 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { currentLocation } = useData().sharedReducer;
  // !!state && alert(JSON.stringify({ ...state }));

  let { id } = useParams();

  React.useEffect(() => {
    !!id && dispatch(setCurrentLocation(id));
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
            }}
          >
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
