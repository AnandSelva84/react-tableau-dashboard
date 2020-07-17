import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import LVL_2 from "../level-2/lvl-2";
import LVL_3 from "../level-3/lvl-3";
import { getLvl, getPanel } from "../../redux/methods/get-level";
import { panels } from "../../data/panels_new";
import useData from "../../hooks/useStore";
import useFetch from "./../../hooks/useFetch";
import { panelDataUrl } from "../../enviroment/urls";
import {
  getViewData,
  getViewDataByRoute,
} from "./../../redux/methods/panel-pocessing";

const ToRender = (props) => {
  const { panel, vizUrls } = props;
  const lvl = +props.lvl;

  if (lvl === 2)
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
  const { id: route } = useParams();
  const [vizUrls, setVizUrls] = useState();
  //{value , id , depth_level}
  const panel = getViewDataByRoute(route, all_views) || null;
  const { data, loading } = useFetch(
    panelDataUrl(app.application.id, panel.id)
  );

  //RESULT IS TWO OBJECTS
  useEffect(() => {
    if (!!data) {
      console.log({ data });
      const responseVizUrls = data.panel_definitions
        .map((p) => p.embedded_viz)
        .flat()
        .map((viz) => viz.embed_url);
      setVizUrls(responseVizUrls);
      console.log({ responseVizUrls });
    }
  }, [data, loading]);

  const getLvl = (panel = "") => {
    return panel.depth_level[panel.depth_level.length - 1];
  };

  return (
    <div className="">
      {!!panel && !!app && !!panels && (
        <ToRender
          panel={panel}
          panels={panels}
          lvl={getLvl(panel)}
          vizUrls={vizUrls}
        />
      )}
    </div>
  );
};

export default SubRouter;
