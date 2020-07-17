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
