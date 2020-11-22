// import sequelize module for data types and initialize db
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const ProductType = db.define("producttype", {
    productID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    typeID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
  });

  
  module.exports = ProductType;