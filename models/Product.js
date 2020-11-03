const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

// Product model
const Product = db.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  module.exports = Product;