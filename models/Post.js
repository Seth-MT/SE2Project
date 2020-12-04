const { Sequelize } = require("sequelize");
const db = require("../db");

// Post model
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
  likes: {
    allowNull: true,
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  dislikes: {
    allowNull: true,
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Post;
