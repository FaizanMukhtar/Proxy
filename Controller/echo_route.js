const express = require("express");
const route = express.Router();
const cors = require("cors")
const echo = require("../Utils/Echo")
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

route.post("/echo", echo);
module.exports = route;