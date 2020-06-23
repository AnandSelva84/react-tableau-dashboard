import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../components/button/button";
import { useDispatch } from "react-redux";
import { pushHistory } from "../../redux/actions/shared";

const LVL_2 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { state = { innerValues: [] } } = useLocation();
  // !!state && alert(JSON.stringify({ ...state }));

  const reformatPath = (path) => {
    return path.split(" ").join("_");
  };

  return (
    <>
      <div className="ampBody">
        {!!state.innerValues.length &&
          state.innerValues.map((value) => (
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
                  history.push(
                    `/${reformatPath(state.title)}/${reformatPath(value)}`
                  );
                }}
              >
                {value}
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
