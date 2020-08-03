//RECEIVE ID AND RETURN ROUTE AND DEPTH
import { fromArrayToObject } from "./tableau-methods";
import { createObj } from "./tableau-methods";

export const getViewData = (id, all_views = []) => {
  const view = all_views.find((_view) => _view.id === id);
  return view;
};

export const getViewDataByRoute = (route, all_views = []) => {
  const view = all_views.find((_view) => _view.route === route);
  return view;
};

export const getAllSiblings = (id, all_views = []) => {
  const siblings = all_views.filter((view) => view.id === id);
  return siblings;
};

export const getVizData = (panelDefs, id) => {
  const found = panelDefs.find((p) => p.panel_id === id.slice());
};

const ObjectGen = (key, value) => ({
  [key]: value,
});

export const findNewKey = (key, filterMappings = []) => {
  debugger;
  const found = filterMappings.find(
    (f) => f.id.toLowerCase() === key.toLowerCase()
  );
  return found?.value || "unkown";
};

export const filterMappingResult = (
  refactoredFilters = {},
  filterMappings = []
) => {
  const keys = Object.keys(refactoredFilters);
  let afterMapping = {};
  keys.forEach((key, index) => {
    const newKey = findNewKey(key, filterMappings);
    const obj = ObjectGen(newKey, refactoredFilters[key]);
    afterMapping = { ...obj, ...afterMapping };
  });
  console.log({ afterMapping });
  return afterMapping;
};

export const getUrlfromRoute = (panels, route) => {
  const found = panels.find((panel) => panel.embedded_viz[0]);
};

export const getRouteById = (all_views, id) => {
  const found = all_views.find((view) => view.id === id);
  return found?.route || "404";
};

const formArraytoObj = (array = []) => {
  let obj = {};
  debugger;
  array.forEach((ObjValue) => {
    const key = Object.values(ObjValue);
    const newObj = createObj(key[0], key[1]);
    obj = { ...obj, ...newObj };
  });
  return obj;
};

export const refactorTimeIntervalFilters = (
  timeIntervals,
  filterMappings = []
) => {
  debugger;
  const newTimeFiltersArrayForm = timeIntervals.map((t) => ({
    [findNewKey(t.filter_id, filterMappings)]: t.value,
  }));
  console.log({ newTimeFiltersArrayForm });
  if (newTimeFiltersArrayForm.length === 1) return newTimeFiltersArrayForm[0];

  const newTimeFiltersObjectForm = fromArrayToObject(newTimeFiltersArrayForm);
  console.log({ newTimeFiltersObjectForm });
  return newTimeFiltersObjectForm;
};
