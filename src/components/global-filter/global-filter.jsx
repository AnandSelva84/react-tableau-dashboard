import React from "react";
import Select from "../select/select";
import useData from "../../hooks/useStore";

const GlobalFilters = () => {
  const { filters, filterState } = useData().sharedReducer;

  return (
    <>
      {filters.map((filter) => (
        <Select
          id={filter.id}
          values={filter.values}
          title={filter.title}
          dependancy={filter.dependancy}
        />
      ))}
    </>
  );
};
export default GlobalFilters;
