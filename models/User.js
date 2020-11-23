const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

// User
const User = db.define("user", {
  // id: {
  //   allowNull: false,
  //   autoIncremenet: true,
  //   primaryKey: true,
  //   type: Sequelize.Integer,
  // },
  firstName: {
    allowNull: false,
    type: Sequelize.STRING,
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
  profileImage: {
    allowNull: true,
    type: Sequelize.BLOB("long"),
  },
  dateOfBirth: {
    allowNull: true,
    type: Sequelize.DATEONLY
  },
  sex: {
    allowNull: true,
    type: Sequelize.STRING
  },
  hairType: {
    allowNull: true,
    type: Sequelize.STRING
  },
  hairLength: {
    allowNull: true,
    type: Sequelize.FLOAT
  },
  bleach: {
    allowNull: true,
    type: Sequelize.BOOLEAN
  },
  coloring: {
    allowNull: true,
    type: Sequelize.BOOLEAN 
  }
});


module.exports = User;