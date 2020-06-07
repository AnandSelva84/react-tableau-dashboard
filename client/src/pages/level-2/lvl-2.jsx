import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/button/button";

const LVL_2 = (props) => {
  const history = useHistory();

  return (
    <>
      <div className="ampBody">
        <div className="panel">
          <Button
            title="Navigate to Graph!"
            style={{ backgroundColor: "#f4f4f4" }}
            onClick={() => {
              history.push("/lvl3");
            }}
          />
        </div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
      </div>
    </>
  );
};

export default LVL_2;
