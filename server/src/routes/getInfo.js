const express = require("express");
const Router = express.Router();
const { ampInfo, kidInfo } = require("../db/infoResponses");

Router.get("/amp", (req, res) => {
  res.send({ ...ampInfo });
});

Router.get("/kid", (req, res) => {
  res.send({ ...kidInfo });
});

module.exports = Router;
