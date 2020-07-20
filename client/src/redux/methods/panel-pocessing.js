//RECEIVE ID AND RETURN ROUTE AND DEPTH

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
  const found = filterMappings.find((f) => f.id.toLowerCase() === key.toLowerCase());
  return found?.value || 'unkown';
};

export const filterMappingResult = (
  refactoredFilters = {},
  filterMappings = []
) => {
  debugger;
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
  const found = panels.find(panel => panel.embedded_viz[0])
}
