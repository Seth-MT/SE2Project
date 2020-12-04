const { Sequelize } = require("sequelize");
const db = require("../db");
const User = require("./User");
const Post = require("./Post");

const UserReact = db.define(
  "userreact",
  {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    postId: {
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
