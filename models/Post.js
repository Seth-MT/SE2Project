const { Sequelize } = require("sequelize");
const db = require("../db");

// Post
const Post = db.define("post", {
  title: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  description: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  styleImgUrl: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  userID: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
});

module.exports = Post;
