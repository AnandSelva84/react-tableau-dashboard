export const getInfoURL = "http://localhost:5000/getInfo";
export const getFilters = "http://localhost:5000/filters";
// export const newFiltersURL = "http://localhost:5000/filters/new";
export const newFiltersURL = "http://localhost:5000/filters/_new";
export const getPanelDefs = "http://localhost:5000/paneldefs";

export const panelDataUrl = (app, id) => `${getPanelDefs}/${app}/${id}`;
