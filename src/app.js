const express = require("express");
const app = express();

app.use(express.static('public'));

app.get("/test", (_req, res) =>  {
  res.status(200).send("Hello world")
})

app.get("/mincraft", (_req, res) =>  {
    res.send()
    
})
module.exports = app;