import React, { useState, useEffect } from "react";
import PanelHeader from "../../../components/panel-header/panel-header";
import WrappedReport from "../../../components/report/report";
import { stylePosition } from "./embeded-feilds/pos-styles";
import EmbededFeilds from "./embeded-feilds/index";
import { PropTypes } from "prop-types";

export default function Panel(props) {
  const [chartState, setChartState] = useState("Bar");
  const [numericValue, setNumericValue] = useState("");
  const { singlePanel, filterMappingResult, filterMapping, index } = props;
  const { embedded_viz } = singlePanel;
  const { embed_url } = embedded_viz[0];
  const [chartUrl, setChartUrl] = useState(embed_url);
  const { embedded_fields } = singlePanel;
  const hasSwitch = embedded_fields.find((f) => f.field_type === "Switch");

  const onSwitchChange = (checked) => {
    checked ? setChartState("Box") : setChartState("Bar");
  };

  useEffect(() => {
    if (hasSwitch) {
      const panelUrls =
        embedded_fields.find((f) => f.field_type === "Switch")
          .embedded_field_options || [];
      const { value: currentUrl } =
        chartState === "Bar" ? panelUrls[0] : panelUrls[1];
      setChartUrl(currentUrl);
    }
  }, [chartState]);

  const handleViewClick = () => {
    props.handleTitleClick(singlePanel, index);
  };

  const feildsArray = embedded_fields.map((feild) => ({
    ...feild,
    field_location: {
      ...stylePosition(feild.field_location),
    },
  }));

  const onNumericChange = (value) => {
    setNumericValue(value);
  };

  return (
    <div style={{ position: "relative" }}>
      <EmbededFeilds
        feilds={feildsArray}
        onSwitchChange={onSwitchChange}
        onNumericChange={onNumericChange}
      />
      <PanelHeader
        title={singlePanel.panel_header_title}
        {...singlePanel}
        handleViewClick={handleViewClick}
      />
      <div className="" style={{ paddingTop: "5rem" }}>
        <WrappedReport
          options={{ height: "25vh" }}
          url={chartUrl}
          parameter={numericValue}
          filterMappingResult={filterMappingResult}
          filterMapping={filterMapping(singlePanel.embedded_viz[0].embed_url)}
          hideToolbar={true}
        />
      </div>
    </div>
  );
}

Panel.propTypes = {
  singlePanel: PropTypes.any,
  filterMappingResult: PropTypes.any,
  filterMapping: PropTypes.any,
  index: PropTypes.number,
  handleTitleClick: PropTypes.func,
};
