import React, { useState, useEffect } from "react";
import PanelHeader from "../../../components/panel-header/panel-header";
import WrappedReport from "../../../components/report/report";

export default function Panel(props) {
  debugger;
  let url = "";
  const [chartState, setChartState] = useState("Bar");
  const { singlePanel, filterMappingResult, filterMapping, index } = props;
  const { embedded_viz } = singlePanel;
  const { embed_url } = embedded_viz[0];
  const { embedded_fields } = singlePanel;
  const { field_type } = embedded_fields[0];
  const panelUrls = embedded_fields[0].embedded_field_options || [];

  const { value: currentUrl } =
    chartState === "Bar" ? panelUrls[0] : panelUrls[1];

  url = field_type === "Switch" ? currentUrl : embed_url;

  const onSwitchChange = (checked) => {
    checked ? setChartState("Box") : setChartState("Bar");
  };

  useEffect(() => {
    // alert(chartState);
  }, [chartState]);

  const handleViewClick = () => {
    props.handleTitleClick(singlePanel, index);
  };

  return (
    <div>
      <PanelHeader
        title={singlePanel.panel_header_title}
        {...singlePanel}
        handleViewClick={handleViewClick}
        onSwitchChange={onSwitchChange}
      />

      <WrappedReport
        options={{ height: "50vh" }}
        url={url}
        filterMappingResult={filterMappingResult}
        filterMapping={filterMapping(singlePanel.embedded_viz[0].embed_url)}
        hideToolbar={true}
      />
    </div>
  );
}
