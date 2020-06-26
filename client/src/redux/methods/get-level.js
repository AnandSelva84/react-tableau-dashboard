const { panels } = require("../../data/panels_new");

const lvl_2_routes = panels.map((p) => p.route);
const lvl_3 = panels.map((p) => p.items).flat();
const lvl_3_routes = lvl_3.map((f) => f.route);

export const getLvl = (route) => {
  if (!!lvl_2_routes.find((p) => p === route)) return 2;
  if (!!lvl_3_routes.find((p) => p === route)) return 3;
  return 0;
};

export const getPanel = (route) => {
  if (getLvl(route) === 2) return panels.find((p) => p.route === route);
  if (getLvl(route) === 3) return lvl_3.find((p) => p.route === route);
  return 0;
};
