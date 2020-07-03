
const { Pool } = require("pg");
const { DB_USER, DB_PASSWORD, DB_HOST } = require("./config.js");

const host = process.env.PG_USER ? "fictiv_db" : DB_HOST;

const pool = new Pool({
  host: host,
  database: "quotes",
  user: process.env.PG_USER || DB_USER,
  password: process.env.PG_PASS || DB_PASSWORD,
  port: 5432
});

module.exports = {
  getQuotes: function(term) {
    return pool.query("SELECT quotes.author, quotes.publication, quotes.content FROM quotes \
                      WHERE to_tsvector('english', content) @@ to_tsquery('english', $1) \
                      AND length(content) < 251", [term]);
  }
};