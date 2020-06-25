const express = require("express");
const path = require("path");
const parser = require("body-parser");
const logger = require("morgan");

const app = express();
const port = 3003;

app.use(parser.json());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../client/dist")));

app.listen(port, () => console.log(`Fictiv server listening on port ${port}...`));