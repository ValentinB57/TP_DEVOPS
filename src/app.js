const express = require("express");
const app = express();

app.use(express.static('public'));

app.get("/test", (_req, res) =>  {
  res.status(200).send("Hello world")
})

module.exports = app;