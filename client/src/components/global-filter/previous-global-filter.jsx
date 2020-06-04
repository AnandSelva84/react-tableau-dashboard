import React from "react";
// import Select from "../select/select";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import { editFilterState, toggleDrawer } from "../../redux/actions/shared";
import { filterModel } from "../../models/filter";
import PrevSelect from "./previous-select";
import ControlButtons from "./control-buttons";
import "./global-filters.css";
import {
  reFormat,
  fromOptionsToChips,
} from "../../redux/methods/re-format-response";

const PrevGlobalFilters = React.memo(() => {
  const { filters, newFilters, filterState } = useData().sharedReducer;
  const [initialLoaded, setInitialLoaded] = React.useState(false);
  const [localFilterState, setLocalFilterState] = React.useState([]);
  const show = newFilters.length > 0;
  const dispatch = useDispatch();
  const chosenIds = filterState.map((filter) => filter.ID) || [];

  // React.useEffect(() => {
  //   const newfilterState = filterState.filter(value => value.lvl)
  //   }, [filterState]);

  // React.useEffect(() => {
  //   //if there is a change in filter state it should be saved in localStorage
  //   //and localStorage data should be retrived and applied in store
  //   if (loaded) {
  //     if (filterState.length > 0) {
  //       console.log("stored filter", filterState);

  //       localStorage.setItem("filters", JSON.stringify(filterState));
  //     }
  //     if (filterState.length === 0) {
  //       localStorage.setItem("filters", JSON.stringify([]));
  //     }
  //   }
  // }, [filterState]);

  //this is for a single time

  // React.useEffect(() => {
  //   //if there is a change in filter state it should be saved in localStorage
  //   //and localStorage data should be retrived and applied in store
  //   setLoaded(true);
  //   const storedFilters = JSON.parse(localStorage.getItem("filters"));
  //   if (!!storedFilters) {
  //     dispatch(editFilterState(storedFilters));
  //     if (storedFilters.length > 0) dispatch(toggleDrawer(true));
  //   }
  //   // filterModel.level
  // }, []);

  const format = (filter_id) => {
    const AfterMerge = newFilters.map((filter, index) => {
      const filterLvl = filter.level;
      return {
        ...filter,
        values: [
          ...filter.values,
          ...(filters.filter(
            (toMerge, toMergeIndex) =>
              toMerge.level === filterLvl && toMergeIndex !== index
          )[0]?.values || []),
        ],
      };
    });

    const afterRefactor = AfterMerge.map((filter) => ({
      filterId: filter.filter_id,
      filterType: filter.filter_type,
      parentFilterId: filter.parent_filter,
      level: filter.level - 1,
      title: filter.title,
      values: [
        ...filter.values.map((value) => ({
          filterOptionId: value.filter_option,
          filter_value_text: value.filter_value,
          filter_display_text: value.filter_display_text,
          order: value.order,
          parentFilterOptionId: value.parent_filter_option,
        })),
      ],
    }));

    // console.log("hello ref", afterRefactor);
    let filterToReturn;
    afterRefactor.forEach((after) => {
      if (after.filterId === filter_id) {
        const a = after.values.filter((value) =>
          chosenIds.includes(value.parentFilterOptionId)
        );
        //you will get filtered values and after with be the chosen filter so return it -- a is values and after is filter
        console.log("Anew values for id ", after.filterId);
        // console.log("Anew values ", a);
        const afterChange = {
          ...after,
          values: [...a],
        };
        if (!!!a.length) {
          console.log("Anew filter in case no values ", {
            ...after,
            values: [],
          });
          filterToReturn = {
            ...after,
            values: [],
          };

          // return {
          //   ...after,
          //   values: [],
          // };
        }

        if (after.level === 0) {
          filterToReturn = { ...after };
        }
        if (a.length) {
          console.log("Anew filter in case there is  ", afterChange);
          filterToReturn = { ...afterChange };
          // return afterChange;
        }
      }
    });

    return filterToReturn;
  };

  const isLvlExist = (array, lvl) => {
    const lvls = filterState.map((filter) => filter.lvl);
    return lvls.includes(lvl);
  };

  React.useEffect(() => {
    if (!!newFilters) {
      let loc = [];
      if (initialLoaded) {
        return;
      }
      newFilters.forEach((filter, index) => {
        const afterChange = format(filter.filter_id);
        if (afterChange.values.length) {
          const lvls = newFilters.map((f) => f.level);
          const stateLvls = filterState.map((f) => f.lvl);
          const lvl = format(filter.filter_id).level;
          const lvlExistance = Math.max(...lvls) - 1 === Math.max(...stateLvls);
          if (!lvlExistance && lvl !== 0) {
            loc = [
              ...loc,
              ...fromOptionsToChips(format(filter.filter_id)?.values, filter),
            ];
            console.log("fullState current array", loc);
            dispatch(
              editFilterState([
                ...loc,
                {
                  ID: "Business",
                  id: "Hierarchies",
                  lvl: 0,
                  parentId: null,
                  value: "Business",
                },
              ])
            );
            // dispatch
          } else {
            console.log("fullState final array", loc);
            if (lvl !== 0) setInitialLoaded(true);
          }
        }
      });
    }
  }, [chosenIds]);

  React.useEffect(() => {
    console.log("local fullState", localFilterState);
  }, [localFilterState]);

  React.useEffect(() => {
    const heighestLvlID = Math.max([...filterState.map((state) => state.lvl)]);
    const heightLvl = filterState.filter((state) => state.ID === heighestLvlID);
    newFilters.forEach((filter, index) => {
      const afterChange = format(filter.filter_id);
      if (afterChange.values.length)
        console.log("filnal filter", format(filter.filter_id));
    });
  }, [chosenIds]);

  const heighestLvlID = Math.max([...filterState.map((state) => state.lvl)]);

  return (
    <>
      <div className="global-wrapper">
        {show && !!newFilters && (
          <div className="filters-wrapper">
            {newFilters.map((filter) => {
              let toRender;
              const afterChange = format(filter.filter_id);
              if (afterChange.values.length)
                return (
                  <PrevSelect
                    id={afterChange.filterId}
                    // values={filter.values}
                    values={afterChange.values}
                    title={afterChange.title}
                    lvl={afterChange.level}
                  />
                );
            })}
          </div>
        )}

        <div className="btns">
          <ControlButtons />
        </div>
      </div>
    </>
  );
});
export default PrevGlobalFilters;
