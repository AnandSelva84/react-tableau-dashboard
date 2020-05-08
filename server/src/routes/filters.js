const express = require("express");
const Router = express.Router();
const { ampInfo, kidInfo } = require("../db/infoResponses");
const { filterResponse } = require("../db/filterResoinse");

Router.get("/", (req, res) => {
  res.send({ ...filterResponse });
});

module.exports = Router;
