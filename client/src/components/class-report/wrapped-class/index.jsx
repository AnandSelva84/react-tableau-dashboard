import React, { useState, useEffect } from "react";
import ClassReport from "..";
import useData from "./../../../hooks/useStore";
import { fromAppliedToOptions } from "./../../../redux/methods/tableau-methods";
import { PropTypes } from "prop-types";

export default function WrappedClass(props) {
  const { url } = props;
  const [render, setRender] = useState(true);
  const [reportState, setReportState] = useState("");

  const { appliedFilters } = useData().sharedReducer;

  const reportFilters = fromAppliedToOptions(appliedFilters);

  const mappedfilters = props.filterMappingResult(
    reportFilters,
    props.filterMapping
  );

  const onReportReady = () => {
    setReportState("ready");
  };

  useEffect(() => {
    setRender(false);
  }, [props.url]);

  useEffect(() => {
    if (!render) {
      setRender(true);
    }
  }, [render]);

  return (
    <>
      {render && (
        <ClassReport
          url={url}
          reportState={reportState}
          onReportReady={onReportReady}
          filters={mappedfilters}
        />
      )}
    </>
  );
}

WrappedClass.propTypes = {
  filterMapping: PropTypes.object,
  filterMappingResult: PropTypes.func,
  url: PropTypes.string,
};
