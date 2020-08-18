import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LVL_2 from "../level-2/lvl-2";
import LVL_3 from "../level-3/lvl-3";
import useData from "../../hooks/useStore";
import useFetch from "./../../hooks/useFetch";
import { panelDataUrl } from "../../enviroment/urls";
import { getViewDataByRoute } from "./../../redux/methods/panel-pocessing";

const ToRender = (props) => {
  const { vizUrls } = props;
  const lvl = props.lvl;

  if (lvl === 2) return <LVL_2 {...props} />;
  else return <LVL_3 {...props} url={vizUrls[0]} />;
};

const SubRouter = () => {
  const { app, panels } = useData().sharedReducer;
  const { all_views = [] } = app;
  const [currentLvl, setCurrentLvl] = useState(null);
  const { id: route } = useParams();
  const [vizResponse, setVizResponse] = useState({ urls: [], vizData: [] });
  const [singleReportData, setSingleReportData] = useState(null);
  const [mlutiReportData, setMlutiReportData] = useState(null);
  const [topTitle, setTopTitle] = useState("");
  const panel = getViewDataByRoute(route, all_views) || null;
  const [parentID, setParentID] = useState("");
  const { data, loading } = useFetch(
    panelDataUrl(app.application.id, panel.id),
    "GET",
    route
  );

  React.useEffect(() => {
    setCurrentLvl(null);
  }, [route]);

  useEffect(() => {
    if (!!data && !!data.panel_definitions) {
      const { view_id: panelViewId } = data.panel_definitions[0];

      if (panelViewId[panelViewId.length - 1] === "3") {
        setCurrentLvl(3);
        setSingleReportData(data.panel_definitions[0]);
        setMlutiReportData(null);
      } else if (panelViewId[panelViewId.length - 1] === "2") {
        setCurrentLvl(2);
        setMlutiReportData(data.panel_definitions);
        setSingleReportData(null);
      }

      const parentId = data.panel_definitions[0].view_id;
      setParentID(parentId);
      const found = panels.find((p) => p.title_action_code);
      const title = found?.panel_header_title || "";

      const responseVizData = data.panel_definitions
        .map((p) => ({ url: p.embedded_viz[0].embed_url, data: p }))
        .flat();
      const urls = responseVizData.map((viz) => viz.url);
      const vizData = responseVizData.map((viz) => viz.data);

      setTopTitle(title);
      setVizResponse({ urls, vizData });
    }
  }, [data, loading, route]);

  const getVizDataByUrl = (url) => {
    const vizDataArray = vizResponse.vizData;
    const found = vizDataArray.find((v) => v.embedded_viz[0].embed_url === url);
    return found;
  };

  useEffect(() => {
    if (vizResponse.vizData.length) {
      getVizDataByUrl(
        "http://public.tableau.com/views/RegionalSampleWorkbook/College"
      );
    }
  }, [vizResponse]);

  return (
    <div className="" style={{ height: "88%" }}>
      <>
        {!!panel && !!app && !!panels && !!vizResponse.vizData.length && (
          <ToRender
            singleReportData={singleReportData}
            mlutiReportData={mlutiReportData}
            panel={panel}
            panels={panels}
            lvl={currentLvl}
            vizUrls={vizResponse.urls}
            vizData={vizResponse.vizData}
            getVizDataByUrl={getVizDataByUrl}
            title={topTitle}
            parentID={parentID}
          />
        )}
      </>
      <>{!!app && vizResponse.length === 0 && <div>no data!</div>}</>
    </div>
  );
};

export default SubRouter;
