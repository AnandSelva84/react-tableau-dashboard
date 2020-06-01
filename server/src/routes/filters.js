const express = require("express");
const Router = express.Router();
const { ampInfo, kidInfo } = require("../db/infoResponses");
const { newFiltersResponse } = require("../db/newFiltersResponse");
const { newFiltersResponse: nf } = require("../db/newFiltersResponse.1");
const { filterResponse } = require("../db/filterResoinse");

Router.get("/", (req, res) => {
  res.send({ ...filterResponse });
});

Router.get("/new", (req, res) => {
  res.send(newFiltersResponse);
});

Router.get("/_new", (req, res) => {
  res.send(nf);
});

module.exports = Router;
