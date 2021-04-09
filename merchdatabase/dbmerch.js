const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "jazz@superuser1",
  host: "localhost",
  port: 5432,
  database: "merchandise"
});

module.exports = pool;
