import React from "react";
import "./lvl-3.css";
import { useDispatch } from "react-redux";
import { setCurrentLocation } from "../../redux/actions/shared";
import { filterMappingResult } from "../../redux/methods/panel-pocessing";
// import WrappedClass from "../../components/class-report/wrapped-class";
import WrappedReport from "./../../components/report/report";
import { PropTypes } from "prop-types";

const LVL_3 = (props) => {
  const { singleReportData } = props;
  const { panel_header_title: ReportTitle, embedded_viz } = singleReportData;
  const { embed_url: ReportURL } = embedded_viz[0];

  const { url } = props;
  const filterMapping = props.getVizDataByUrl(url).embedded_viz[0]
    .filter_mapping;
  const title = props.getVizDataByUrl(url).panel_header_title;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setCurrentLocation(ReportTitle));
  }, [title]);

  return (
    <div style={{ paddingBottom: "2rem" }}>
      {!!props.url && (
        <WrappedReport
          options={{ height: "70vh" }}
          url={ReportURL}
          filterMappingResult={filterMappingResult}
          filterMapping={filterMapping}
          hideToolbar={false}
        />
      )}
      {/* <WrappedClass
        url={ReportURL}
        filterMappingResult={filterMappingResult}
        filterMapping={filterMapping}
      /> */}
    </div>
  );
};

LVL_3.propTypes = {
  getVizDataByUrl: PropTypes.func,
  url: PropTypes.string,
  singleReportData: PropTypes.any,
};

export default LVL_3;
