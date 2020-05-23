import React from "react";
import Select from "../select/select";
import useData from "../../hooks/useStore";
import "./global-filters.css";
import ControlButtons from "./control-buttons";
import { useDispatch } from "react-redux";
import { editFilterState } from "../../redux/actions/shared";

const GlobalFilters = React.memo(() => {
  const {
    filters,
    newFilters,
    filterState,
    savedFilters,
  } = useData().sharedReducer;
  const show = newFilters.length > 0;
  const dispatch = useDispatch();
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("filters"));
    if (!!saved) dispatch(editFilterState(saved));
  }, []);

  // const getValues = (title) => {
  //   console.log(filterState);

  //   ;
  //   return filterState
  //     .filter((value) => value.id === title)
  //     .map((value) => value.id);
  // };

  return (
    <div className="global-wrapper">
      {show && !!newFilters && (
        <div className="filters-wrapper">
          {newFilters.map((filter) => (
            <Select
              id={filter.filterId}
              values={filter.values}
              // selected={getValues(filter.title)}
              title={filter.title}
              lvl={filter.level}
              multi={filter.filterType === "Multi-Select"}
              disableCloseOnSelect={filter.filterType === "Multi-Select"}
            />
          ))}
        </div>
      )}
      <div className="btns">
        <ControlButtons />
      </div>
    </div>
  );
});
export default GlobalFilters;
