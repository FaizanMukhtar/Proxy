const express = require("express");
const app = express();
const port = 3000; // You can choose any available port
const route = require("./Controller/echo_route");
// Define a route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/route", route);
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
