const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const fetch = require("node-fetch");

app.get("/games", cors(), (req, res) => {
  fetch("https://www.rost.bet/api/v1/games?lang=en")
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    });
});

const port = 9000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
