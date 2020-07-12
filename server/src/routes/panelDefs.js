const express = require("express");
const Router = express.Router();
const { ampInfo, kidInfo } = require("../db/infoResponses");
const { panelDefs } = require("../db/panelDefs");


Router.get("/:id", (req, res) => {
  console.log('parameter id for paneldefs ',req.params.id);
  res.send({ ...panelDefs });
});


module.exports = Router;
