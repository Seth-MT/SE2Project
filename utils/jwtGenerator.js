// creates a jwt token for a user
const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id) {
  const payload = {
    user: id,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "4hr" }); // set time period for jwt expiration
}

module.exports = jwtGenerator;