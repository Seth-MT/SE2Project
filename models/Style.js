// import sequelize module for data types and initialize db
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Style = db.define("style", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hairLength: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hairType: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
  });

  
  module.exports = Style;