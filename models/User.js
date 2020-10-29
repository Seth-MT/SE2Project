const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  // id: {
  //   allowNull: false,
  //   autoIncremenet: true,
  //   primaryKey: true,
  //   type: Sequelize.Integer,
  // },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  userName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = User;
