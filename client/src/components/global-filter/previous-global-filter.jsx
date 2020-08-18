import React from "react";
import useData from "../../hooks/useStore";
import { useDispatch } from "react-redux";
import {
  editFilterState,
  setStoredViewdFilters,
} from "../../redux/actions/shared";
import ControlButtons from "./control-buttons";
import "./global-filters.css";

import MainSwitch from "../main-switch/main-switch";
import { useHistory } from "react-router-dom";
import TimeFilters from "./time-filters/index";

const PrevSelect = React.lazy(() => import("./previous-select"));

const PrevGlobalFilters = () => {
  const {
    newFilters,
    filterState,
    storedViewedFilters,
    currentMainFilter,
    drawer,
    appliedFilters,
  } = useData().sharedReducer;
  const [viewedFilters, setViewedFilters] = React.useState([]);
  const [reformattedNewFilters, setReformattedNewFilters] = React.useState([]);

  const show = newFilters.length > 0;
  const dispatch = useDispatch();
  const chosenIds = filterState.map((filter) => filter.ID) || [];
  const history = useHistory();
  const { pathname } = history.location;
  const path = pathname.substr(1, pathname.length);

  React.useEffect(() => {
    if (newFilters && newFilters.length > 1) {
      let data = newFilters.map((filter) => ({
        ...filter,
        values: filter.values.map((value) => ({
          ...value,
          lvl: filter.level,
          id: filter.title,
          filter_id: filter.filter_id,
        })),
      }));
      data = data.map((filter) => filter.values).flat();
      data = data.map((filter) => ({
        ID: filter.filter_option,
        value: filter.filter_value,
        lvl: filter.lvl - 1,
        id: filter.id,
        parentId: filter.parent_filter_option,
        filter_id: filter.filter_id,
      }));
      setReformattedNewFilters(data);
    }
  }, [newFilters]);

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
    if (appliedFilters.length) dispatch(editFilterState([...appliedFilters]));
  }, [drawer]);

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
        const afterChange = {
          ...after,
          values: [...a],
        };
        if (!a.length) {
          filterToReturn = {
            ...after,
            values: [],
          };
        }

        if (after.level === 0) {
          filterToReturn = { ...after };
        }
        if (a.length) {
          if (!viewedFilters.map((f) => f.id).includes(after.filterId)) {
            // if (storedViewedFilters.length)
            setViewedFilters([
              ...viewedFilters,
              { id: after.filterId, valuesLength: a.length },
            ]);
          }

          filterToReturn = { ...afterChange };
        }
      }
    });

    return filterToReturn;
  };

  React.useEffect(() => {
    if (viewedFilters.length === heighestLvlFilter - 1)
      dispatch(setStoredViewdFilters([...viewedFilters]));
    return () => {};
  }, [viewedFilters]);

  const handleValuesChange = (valuesLength, id) => {
    dispatch(
      setStoredViewdFilters([
        ...storedViewedFilters.filter((f) => f.id !== id),
        { id, valuesLength },
      ])
    );
    return;
  };

  return (
    <>
      <div className="drawer-wrapper">
        <div className="global-wrapper">
          {show && newFilters && (
            <div className="filters-wrapper">
              <MainSwitch
                onSwitch={() => {
                  setViewedFilters([]);
                  dispatch(setStoredViewdFilters([]));
                }}
              />

              {newFilters.map((filter) => {
                const afterChange = format(filter.filter_id);
                if (
                  afterChange.values.length ||
                  storedViewedFilters.find((f) => f.id === filter.filter_id)
                )
                  return (
                    <React.Suspense fallback={<>Loading...</>}>
                      <PrevSelect
                        reformattedNewFilters={reformattedNewFilters}
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
              {howManySlashes(pathname) === 1 && path && <TimeFilters />}
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
};
export default PrevGlobalFilters;
