const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

// Product model
const Product = db.define("product", {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    brand: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  });

  module.exports = Product;