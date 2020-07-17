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
  const [vizResponse, setVizResponse] = useState({ urls: [], vizData: [] });
  //{value , id , depth_level}
  const panel = getViewDataByRoute(route, all_views) || null;
  const { data, loading } = useFetch(
    panelDataUrl(app.application.id, panel.id)
  );

  //RESULT IS TWO OBJECTS
  useEffect(() => {
    if (!!data && !!data.panel_definitions) {
      debugger;
      const responseVizData = data.panel_definitions
        .map((p) => ({ url: p.embedded_viz[0].embed_url, data: p }))
        .flat();
      const urls = responseVizData.map((viz) => viz.url);
      const vizData = responseVizData.map((viz) => viz.data);
      setVizResponse({ urls, vizData });
    }
  }, [data, loading]);

  useEffect(() => {
    if (!!vizResponse.vizData.length) {
      getVizDataByUrl(
        "http://public.tableau.com/views/RegionalSampleWorkbook/College"
      );
    }
  }, [vizResponse]);

  const getVizDataByUrl = (url) => {
    debugger;
    const vizDataArray = vizResponse.vizData;
    const found =
      vizDataArray.find((v) => v.embedded_viz[0].embed_url === url)
        ?.panel_header_title || "";
    return found;
  };

  const getLvl = (panel = "") => {
    return panel.depth_level[panel.depth_level.length - 1];
  };

  return (
    <div className="">
      <>
        {!!panel && !!app && !!panels && (
          <ToRender
            panel={panel}
            panels={panels}
            lvl={getLvl(panel)}
            vizUrls={vizResponse.urls}
            getVizDataByUrl={getVizDataByUrl}
          />
        )}
      </>
      <>{!!app && vizResponse.length === 0 && <div>no data!</div>}</>
    </div>
  );
};

export default SubRouter;
