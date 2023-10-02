const express = require("express");
const route = express.Router();
const cors = require("cors")
const echo = require("../Utils/Echo")
const df= require("../Utils/DialogFlow")
const hook=require("../Utils/hook")
route.use(cors());
route.post("/echo", express.json(), function (req, res) {
  echo(req)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
})
route.post("/dialogflow", express.json(), function (req, res) {
  df(req)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
})
route.post("/hook",express.json(), function(req,res)
{
  hook(req)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
})

module.exports = route;