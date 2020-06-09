import React from "react";
// import Select from "../select/select";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import { editFilterState, toggleDrawer } from "../../redux/actions/shared";
import { filterModel } from "../../models/filter";
import ControlButtons from "./control-buttons";
import "./global-filters.css";
import {
  reFormat,
  fromOptionsToChips,
} from "../../redux/methods/re-format-response";
import MainSwitch from "../main-switch/main-switch";
import { useHistory } from "react-router-dom";
import DateControls from "../../pages/level-2/date-controls";
const PrevSelect = React.lazy(() => import("./previous-select"));

const PrevGlobalFilters = React.memo(() => {
  const { filters, newFilters, filterState } = useData().sharedReducer;
  const [viewedFilters, setViewedFilters] = React.useState([]);
  const show = newFilters.length > 0;
  const dispatch = useDispatch();
  const chosenIds = filterState.map((filter) => filter.ID) || [];
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.substr(1, pathname.length);

  const heighestLvlFilter = Math.max(
    ...[...newFilters.map((filter) => filter.level)]
  );
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

    let filterToReturn;
    afterRefactor.forEach((after) => {
      if (after.filterId === filter_id) {
        const a = after.values.filter((value) =>
          chosenIds.includes(value.parentFilterOptionId)
        );
        //you will get filtered values and after with be the chosen filter so return it -- a is values and after is filter
        console.log("Anew values for id ", after.filterId);
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
        }

        if (after.level === 0) {
          filterToReturn = { ...after };
        }
        if (a.length) {
          if (!viewedFilters.map((a) => a.id).includes(after.filterId)) {
            setViewedFilters([
              ...viewedFilters,
              { id: after.filterId, valuesLength: a.length },
            ]);
          }

          console.log("Anew filter in case there is  ", afterChange);
          filterToReturn = { ...afterChange };
        }
      }
    });

    return filterToReturn;
  };

  React.useEffect(() => {
    console.log("viewed ", viewedFilters);
  }, [viewedFilters]);

  React.useEffect(() => {
    // newFilters.forEach((filter) => {
    //   format(filter.filter_id);
    // });
  }, [chosenIds]);

  return (
    <>
      <div className="drawer-wrapper">
        <div className="global-wrapper">
          {show && !!newFilters && (
            <div className="filters-wrapper">
              <MainSwitch
                onSwitch={() => {
                  setViewedFilters([]);
                }}
              />

              {newFilters.map((filter) => {
                let toRender;
                const afterChange = format(filter.filter_id);
                if (
                  afterChange.values.length ||
                  !!viewedFilters.find((f) => f.id === filter.filter_id)
                )
                  return (
                    <React.Suspense fallback={<>Loading...</>}>
                      <PrevSelect
                        maxLength={heighestLvlFilter - 1}
                        id={afterChange.filterId}
                        // values={filter.values}
                        values={afterChange.values}
                        title={afterChange.title}
                        lvl={afterChange.level}
                      />
                    </React.Suspense>
                  );
              })}
              {path !== "" && <DateControls />}
            </div>
          )}

          <div className="btns">
            <ControlButtons />
          </div>
        </div>

        {path === "lvl3" && <div className="private-filters"></div>}
      </div>
    </>
  );
});
export default PrevGlobalFilters;

// React.useEffect(() => {
//   if (!!newFilters) {
//     let loc = [];
//     if (initialLoaded) {
//       return;
//     }
//     newFilters.forEach((filter, index) => {
//       const afterChange = format(filter.filter_id);
//       if (afterChange.values.length) {
//         const lvls = newFilters.map((f) => f.level);
//         const stateLvls = filterState.map((f) => f.lvl);
//         const lvl = format(filter.filter_id).level;
//         const stateIsFull = Math.max(...lvls) - 1 === Math.max(...stateLvls);
//         if (!stateIsFull && lvl !== 0) {
//           loc = [
//             ...loc,
//             ...fromOptionsToChips(format(filter.filter_id)?.values, filter),
//           ];
//           dispatch(
//             editFilterState([
//               ...loc,
//               {
//                 ID: "Business",
//                 id: "Hierarchies",
//                 lvl: 0,
//                 parentId: null,
//                 value: "Business",
//               },
//             ])
//           );
//           // dispatch
//         } else {
//           if (lvl !== 0) setInitialLoaded(true);
//         }
//       }
//     });
//   }
// }, [chosenIds]);
