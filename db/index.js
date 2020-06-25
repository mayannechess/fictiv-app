
const { DB_USER, DB_PASSWORD } = require("./config.js");

const { Pool } = require("pg");

const pool = new Pool({
  // host: ,
  database: "quotes",
  user: process.env.PG_USER || DB_USER,
  password: process.env.PG_PASS || DB_PASSWORD,
  port: 5432
});

module.exports = {
  query: function(text, params) {
    return pool.query(text, params);
  }
};