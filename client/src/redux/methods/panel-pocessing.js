//RECEIVE ID AND RETURN ROUTE AND DEPTH
import { fromArrayToObject } from "./tableau-methods";
// import { createObj } from "./tableau-methods";

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

//  const getVizData = (panelDefs, id) => {
//   const found = panelDefs.find((p) => p.panel_id === id.slice());
// };

const ObjectGen = (key, value) => ({
  [key]: value,
});

export const findNewKey = (key, filterMappings = []) => {
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
  keys.forEach((key) => {
    const newKey = findNewKey(key, filterMappings);
    const obj = ObjectGen(newKey, refactoredFilters[key]);
    afterMapping = { ...obj, ...afterMapping };
  });
  return afterMapping;
};

//  const getUrlfromRoute = (panels, route) => {
//   const found = panels.find((panel) => panel.embedded_viz[0]);
// };

export const getRouteById = (all_views, id) => {
  const found = all_views.find((view) => view.id === id);
  return found?.route || "404";
};

export const refactorTimeIntervalFilters = (
  timeIntervals,
  filterMappings = []
) => {
  const newTimeFiltersArrayForm = timeIntervals.map((t) => ({
    [findNewKey(t.filter_id, filterMappings)]: t.value,
  }));
  if (newTimeFiltersArrayForm.length === 1) return newTimeFiltersArrayForm[0];

  const newTimeFiltersObjectForm = fromArrayToObject(newTimeFiltersArrayForm);
  return newTimeFiltersObjectForm;
};
