const express = require("express");
const Router = express.Router();
const { ampInfo, kidInfo } = require("../db/infoResponses");


Router.get("/:id", (req, res) => {
  console.log('parameter id ',req.params.id);
  res.send({ ...ampInfo });
});

Router.get("/amp", (req, res) => {
  res.send({ ...ampInfo });
});




Router.get("/kid", (req, res) => {
  res.send({ ...kidInfo });
});

module.exports = Router;
