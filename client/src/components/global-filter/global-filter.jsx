import React from "react";
import Select from "../select/select";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import { editFilterState, toggleDrawer } from "../../redux/actions/shared";

const GlobalFilters = React.memo(() => {
  const { filters, newFilters, filterState } = useData().sharedReducer;
  const [loaded, setLoaded] = React.useState(false);
  const show = newFilters.length > 0;
  const dispatch = useDispatch();
  React.useEffect(() => {
    //if there is a change in filter state it should be saved in localStorage
    //and localStorage data should be retrived and applied in store
    if (loaded) {
      if (filterState.length > 0) {
        console.log("stored filter", filterState);

        localStorage.setItem("filters", JSON.stringify(filterState));
      }
      if (filterState.length === 0) {
        localStorage.setItem("filters", JSON.stringify([]));
      }
    }
    debugger;
  }, [filterState]);

  //this is for a single time
  React.useEffect(() => {
    //if there is a change in filter state it should be saved in localStorage
    //and localStorage data should be retrived and applied in store
    setLoaded(true);
    const storedFilters = JSON.parse(localStorage.getItem("filters"));
    if (!!storedFilters) {
      dispatch(editFilterState(storedFilters));
      if (storedFilters.length > 0) dispatch(toggleDrawer(true));
    }
  }, []);
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
});
export default GlobalFilters;
