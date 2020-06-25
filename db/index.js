
const { Pool } = require("pg");

const pool = new Pool({
  host: "db",
  database: "quotes",
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  port: 5432
});

module.exports = {
  query: function(text, params) {
    return pool.query(text, params);
  }
};