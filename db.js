const Sequelize = require("sequelize");

// connects db to server
const db = new Sequelize(
  "postgres://tcrcxuzu:NZYbl_mSwjr4d7WTZZyhHHewjosYj0AO@lallah.db.elephantsql.com:5432/tcrcxuzu"
);

// test DB connection when the server starts
db.authenticate()
  .then(() => console.log("Database conntected...."))
  .catch((err) => console.log("Error: " + err));

module.exports = db;