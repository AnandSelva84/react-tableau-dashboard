import React, { useState, useEffect } from "react";
import PanelHeader from "../../../components/panel-header/panel-header";
import WrappedReport from "../../../components/report/report";
import { stylePosition } from "./embeded-feilds/pos-styles";
import EmbededFeilds from "./embeded-feilds/index";
import { PropTypes } from "prop-types";
import { formatQueryStrings } from "./../../../redux/methods/report-url-constructor";

export default function Panel(props) {
  const { appliedTimeIntervals } = props;
  const screenWidth = window.innerWidth;
  const [chartState, setChartState] = useState("Bar");
  // const [url, setUrl] = useState(chartUrl);
  const [parametersArray, setParametersArray] = useState([]);
  const [timeParams, setTimeParams] = useState([]);
  const [numericValue, setNumericValue] = useState("");
  const { singlePanel, filterMappingResult, filterMapping, index } = props;
  const { embedded_viz } = singlePanel;
  const { embed_url } = embedded_viz[0];
  const [chartUrl, setChartUrl] = useState(embed_url);
  const { embedded_fields } = singlePanel;
  const hasSwitch = embedded_fields.find((f) => f.field_type === "Switch");
  const largeScreen = screenWidth >= 1960;
  const reportHeight = largeScreen ? "30vh" : "25vh";
  const onSwitchChange = (checked) => {
    checked ? setChartState("Box") : setChartState("Bar");
  };

  const getRangeType = (title = "") => {
    const stringArray = title.split(" ");
    return stringArray[1];
  };

  useEffect(() => {
    // field_impact_parameter
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

  useEffect(() => {
    const isCustom = appliedTimeIntervals.length === 3;
    const isSignle = appliedTimeIntervals.length === 1;
    const isEmpty = appliedTimeIntervals.length === 0;
    const title = "Time_Interval";

    let _timeParams = [];

    if (isEmpty) {
      _timeParams = [];
      return;
    }
    if (isCustom) {
      const fromTo_Array = appliedTimeIntervals.slice(1);
      const formated = fromTo_Array.map((e) => ({
        value: e.value,
        title: getRangeType(e.filter_type),
      }));
      _timeParams = [...formated];
    }
    if (isSignle) {
      _timeParams = [{ title, value: appliedTimeIntervals[0].value }];
    }

    setTimeParams([..._timeParams]);
  }, [appliedTimeIntervals]);

  useEffect(() => {
    const _url = formatQueryStrings([...timeParams, ...parametersArray]);
    // console.log({ _url: _url === "?" });
    if (_url === "?") {
      setChartUrl(embed_url);
      return;
    }

    setChartUrl(embed_url + _url);
  }, [timeParams, parametersArray]);

  const getParameter = (field_impact_parameter, value) => {
    const parameter = { title: field_impact_parameter, value };
    return parameter;
  };

  const onNumericChange = (value, field_impact_parameter) => {
    const parameter = getParameter(field_impact_parameter, value);
    setParametersArray([parameter]);
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
      <div className="" style={{ paddingTop: "55px" }}>
        <WrappedReport
          options={{ height: reportHeight }}
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
  appliedTimeIntervals: PropTypes.any,
};
