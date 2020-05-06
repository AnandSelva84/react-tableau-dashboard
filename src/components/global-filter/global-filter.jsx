import React from "react";
import Select from "../select/select";
import useData from "../../hooks/useStore";

const GlobalFilters = () => {
  const { filters, filterState, newFilters } = useData().sharedReducer;
  const show = newFilters.length > 0;
  return (
    <>
      {show && (
        <>
          {newFilters.map((filter) => (
            <Select
              id={filter.id}
              values={filter.values}
              title={filter.title}
              dependancy={filter.dependancy}
              lvl={filter.lvl}
            />
          ))}
        </>
      )}
    </>
  );
};
export default GlobalFilters;
