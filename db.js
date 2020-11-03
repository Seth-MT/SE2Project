const Sequelize = require("sequelize");

const db = new Sequelize(
  "postgres://tcrcxuzu:NZYbl_mSwjr4d7WTZZyhHHewjosYj0AO@lallah.db.elephantsql.com:5432/tcrcxuzu"
);

//Test DB
db.authenticate()
  .then(() => console.log("Database conntected...."))
  .catch((err) => console.log("Error: " + err));

module.exports = db;