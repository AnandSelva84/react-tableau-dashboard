const express = require("express");
const Router = express.Router();
const { ampInfo, kidInfo } = require("../db/infoResponses");
const { newFiltersResponse } = require("../db/newFiltersResponse");
const { filterResponse } = require("../db/filterResoinse");

Router.get("/", (req, res) => {
  res.send({ ...filterResponse });
});

Router.get("/new", (req, res) => {
  res.send({ ...newFiltersResponse });
});

module.exports = Router;
