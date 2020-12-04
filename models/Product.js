// import sequelize module for data types and initialize db
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

// Product model
const Product = db.define("product", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    brand: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  module.exports = Product;