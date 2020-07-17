const express = require("express");
const Router = express.Router();
const { ampInfo, kidInfo } = require("../db/infoResponses");
const { panelDefs } = require("../db/panelDefs");
const { level2PanelDefs } = require("../db/level2PanelDefs");
const { level3PanelDefs } = require("../db/level3PanelDefs");

Router.get("/:id/:viewid", (req, res) => {
  const { viewid } = req.params;
  if (!!viewid) console.log("", req.params);
  if (viewid == "PORT_1_L2") res.send({ ...level2PanelDefs });
  else res.send({ ...level3PanelDefs });
});

Router.get("/:id", (req, res) => {
  console.log("parameter id for paneldefs ", req.params.id);
  res.send({ ...panelDefs });
});

module.exports = Router;
