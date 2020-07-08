const express = require("express");
const path = require("path");
const parser = require("body-parser");
const logger = require("morgan");
const nodemailer = require("nodemailer");

const { MAIL_USER, MAIL_PASSWORD } = require("../config.js");
const { getQuotes } = require("../db");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || MAIL_USER,
    pass: process.env.GMAIL_PASS || MAIL_PASSWORD
  }
});

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

app.post("/suggest", async function sendEmail(req, res) {
  const mailOptions = {
    from: "july.hendricks@gmail.com",
    to: "mayplusmay@gmail.com",
    subject: "FICTIV: Author suggestion",
    text: `A site visitor suggested the author: ${req.body.author}`
  };
  try {
    await transporter.sendMail(mailOptions);
    res.sendStatus(201);
  } catch(err) {
    console.log("ERROR:", err);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Fictiv server listening on port ${port}...`));