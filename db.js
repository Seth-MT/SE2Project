const Pool = require("pg").Pool;
require("dotenv").config();

const proConfig =
  "postgres://woxzipji:E0G44eAjzW83QA1S7cTuP2toNxGezA11@lallah.db.elephantsql.com:5432/woxzipji";

const pool = new Pool({
  connectionString: proConfig,
});

module.exports = pool;
