import React from "react";
import { useLocation, useParams } from "react-router-dom";
import LVL_2 from "../level-2/lvl-2";
import LVL_3 from "../level-3/lvl-3";
import { getLvl, getPanel } from "../../redux/methods/get-level";
import { panels } from "../../data/panels_new";
import useData from "../../hooks/useStore";
import {
  getViewData,
  getViewDataByRoute,
} from "./../../redux/methods/panel-pocessing";

const ToRender = (props) => {
  const { panel } = props;
  debugger;
  if (panel.depth_level === "Level 2")
    return (
      <>
        <LVL_2 {...props} />
        <h3>lvl 2</h3>
      </>
    );
  else
    return (
      // <LVL_3 {...props} />
      <h3>lvl 3</h3>
    );
};

const SubRouter = (props) => {
  const { app, panels } = useData().sharedReducer;
  const { all_views = [] } = app;
  const { id } = useParams();

  //{value , id , depth_level}
  const panel = getViewDataByRoute(id, all_views) || null;

  return (
    <div className="">
      {!!panel && !!app && !!panels && <ToRender panel={panel} />}
    </div>
  );
};

export default SubRouter;
