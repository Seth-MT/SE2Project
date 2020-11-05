// creates a jwt token for a user
const jwt = require("jsonwebtoken");
//require("dotenv").config();

function jwtGenerator(id) {
  const payload = {
    user: id,
  };
  //process.env.jwtSecret
  return jwt.sign(payload, "cat123", { expiresIn: "24hr" }); // set time period for jwt expiration
}

module.exports = jwtGenerator;
