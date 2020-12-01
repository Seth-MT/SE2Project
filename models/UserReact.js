const { Sequelize } = require("sequelize");
const db = require("../db");
const User = require("./User");
const Post = require("./Post");

const UserReact = db.define(
  "userreact",
  {
    userID: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    postID: {
      type: Sequelize.INTEGER,
      references: {
        model: Post,
        key: "id",
      },
    },
    liked: {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: "noreact",
    },
  },
  { timestamps: false }
);

module.exports = UserReact;
