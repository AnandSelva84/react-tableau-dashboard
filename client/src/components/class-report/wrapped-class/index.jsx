import React, { useState, useEffect } from "react";
import ClassReport from "..";
import useData from "./../../../hooks/useStore";
import { fromAppliedToOptions } from "./../../../redux/methods/tableau-methods";

export default function WrappedClass(props) {
  const [counter, setCounter] = useState(0);
  const { url } = props;
  const [loaded, setLoaded] = useState(false);
  const [render, setRender] = useState(true);

  const { appliedFilters } = useData().sharedReducer;

  const reportFilters = fromAppliedToOptions(appliedFilters);

  const mappedfilters = props.filterMappingResult(
    reportFilters,
    props.filterMapping
  );

  useEffect(() => {
    setRender(false);
  }, [props.url]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!render) {
      setRender(true);
    }
  }, [render]);

  return <>{render && <ClassReport url={url} filters={mappedfilters} />}</>;
}
