import React from "react";
// import Select from "../select/select";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import {
  editFilterState,
  toggleDrawer,
  setStoredViewdFilters,
} from "../../redux/actions/shared";
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
  const {
    filters,
    newFilters,
    filterState,
    storedViewedFilters,
    currentMainFilter,
    drawer,
    appliedFilters,
  } = useData().sharedReducer;
  const [viewedFilters, setViewedFilters] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);

  const show = newFilters.length > 0;
  const dispatch = useDispatch();
  const chosenIds = filterState.map((filter) => filter.ID) || [];
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.substr(1, pathname.length);

  const howManySlashes = (text) => {
    var letterArray = text.split("");
    let counter = 0;
    letterArray.forEach((letter) => {
      if (letter === "/") {
        counter += 1;
      }
    });
    return counter;
  };

  const heighestLvlFilter = Math.max(
    ...[...newFilters.map((filter) => filter.level)]
  );

  React.useEffect(() => {
    dispatch(editFilterState([...appliedFilters]));
  }, [drawer]);
  React.useEffect(() => {
    const ids = filterState.map((f) => f.ID);
    const parents = filterState.map((f) => f.parentId);

    console.log("error here all ids", ids);
    console.log("error here all parents", parents);

    console.log(
      "error here all",
      parents.every((e) => ids.includes(e))
    );

    // filterState.forEach((filter) => {
    //   if (!filterState.map((f) => f.ID).includes(filter.parentId)) {
    //     console.log("error here not included", filter);
    //   } else {
    //     console.log("error here included", filter);
    //   }
    // });
  }, [filterState]);

  React.useEffect(() => {
    setViewedFilters([]);
  }, [currentMainFilter]);
  const format = (filter_id) => {
    const afterRefactor = newFilters.map((filter) => ({
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
            // if (storedViewedFilters.length)
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
    console.log("viewed max ", heighestLvlFilter);
    console.log("viewed current ", viewedFilters);
    if (viewedFilters.length === heighestLvlFilter - 1)
      dispatch(setStoredViewdFilters([...viewedFilters]));
    return () => {
      console.log("on unmount viewed", viewedFilters);
    };
  }, [viewedFilters]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);
  React.useEffect(() => {
    if (loaded) {
      // dispatch(setStoredViewdFilters([]));
      // setViewedFilters([]);
    }
  }, [currentMainFilter]);

  const handleValuesChange = (valuesLength, id) => {
    dispatch(
      setStoredViewdFilters([
        ...storedViewedFilters.filter((f) => f.id !== id),
        { id, valuesLength },
      ])
    );
  };

  return (
    <>
      <div className="drawer-wrapper">
        <div className="global-wrapper">
          {show && !!newFilters && (
            <div className="filters-wrapper">
              <MainSwitch
                onSwitch={() => {
                  setViewedFilters([]);
                  dispatch(setStoredViewdFilters([]));
                }}
              />

              {newFilters.map((filter) => {
                let toRender;
                const afterChange = format(filter.filter_id);
                if (
                  afterChange.values.length ||
                  !!storedViewedFilters.find((f) => f.id === filter.filter_id)
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
                        onValuesChanged={handleValuesChange}
                      />
                    </React.Suspense>
                  );
              })}
              {howManySlashes(pathname) === 1 && !!path && <DateControls />}
            </div>
          )}

          <div className="btns">
            <ControlButtons />
          </div>
        </div>

        {howManySlashes(pathname) > 1 && (
          <div className="private-filters"></div>
        )}
      </div>
    </>
  );
});
export default PrevGlobalFilters;
