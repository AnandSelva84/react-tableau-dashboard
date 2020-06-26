import React from "react";
import { useLocation, useParams } from "react-router-dom";
import LVL_2 from "../level-2/lvl-2";
import LVL_3 from "../level-3/lvl-3";
import { getLvl, getPanel } from "../../redux/methods/get-level";
import { panels } from "../../data/panels_new";

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
  const { id } = useParams();
  const { state } = useLocation();

  React.useEffect(() => {
    // alert(getLvl(id));
    // alert(JSON.stringify(getPanel(id)));
  }, [state]);

  return (
    <div className="">{!!getPanel(id) && <ToRender {...getPanel(id)} />}</div>
  );
};

export default SubRouter;
