import React from "react";
import { useHistory } from "react-router-dom";
import useData from "./../../hooks/useStore";
import { useDispatch } from "react-redux";
import { popHistory } from "../../redux/actions/shared";
import { PropTypes } from "prop-types";

// export interface HistoryObject {
//     path: string;
//     pathName: string;
//   }

// interface INavigator {
//   path: string;
// }

const Arrow = () => (
  <div className="" style={{ margin: "0rem 0.4rem" }}>
    {"-"}
  </div>
);

// props: INavigator
const NavigationBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { historyStack } = useData().sharedReducer;

  //   obj: HistoryObject
  const findInexOf = (pathName) => {
    let N =
      historyStack.length -
      historyStack.findIndex((obj) => obj.pathName === pathName);
    return N - 1;
  };

  //   pathObj: HistoryObject

  return (
    <>
      <div
        className="tool-wrapper"
        style={{ display: "flex", minHeight: "48px" }}
      >
        {historyStack.map((pathObj, index) => (
          <div
            key={Math.random()}
            className=""
            style={{
              display: "flex",
              minHeight: "48px",
              alignItems: "center",
              padding: "0.5rem 1rem",
            }}
          >
            <>
              <div
                className=""
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const times = findInexOf(pathObj.pathName);
                  dispatch(popHistory(times));
                  history.push(pathObj.path);
                }}
              >
                {pathObj.pathName}
              </div>
              {index !== historyStack.length - 1 && <Arrow />}
            </>
          </div>
        ))}
      </div>
    </>
  );
};

NavigationBar.propTypes = {
  path: PropTypes.any,
};

export default NavigationBar;
