import React from "react";
import { useLocation } from "react-router-dom";
import LVL_2 from "../level-2/lvl-2";
import LVL_3 from "../level-3/lvl-3";

const ToRender = (props) => {
  React.useEffect(() => {
    console.log(props);

    debugger;
  }, []);
  if (props.level === 2)
    return (
      <>
        <LVL_2 {...props} />
      </>
    );
  else return <LVL_3 {...props} />;
};

const SubRouter = (props) => {
  const { state } = useLocation();

  React.useEffect(() => {
    // alert(state?.level);
  }, [state]);

  return (
    <div className="">
      <ToRender {...state} />
    </div>
  );
};

export default SubRouter;
