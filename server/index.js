const express = require("express");
const path = require("path");
const parser = require("body-parser");
const logger = require("morgan");

const { getQuotes } = require("../db");

const app = express();
const port = 3003;

app.use(parser.json());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/quotes/:term", async function sendQuotes(req, res) {
  let term = req.params.term;
  try {
    let result = await getQuotes(term);
    res.status(200);
    res.json(result.rows);
  } catch(err) {
    console.log("ERROR:", err);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Fictiv server listening on port ${port}...`));