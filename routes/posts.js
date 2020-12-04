const router = require("express").Router();
const db = require("../db");
const Post = require("../models/Post");
const User = require("../models/User");
const UserReact = require("../models/UserReact");
const authorization = require("../middleware/authorization");

const jwt = require("jsonwebtoken");
require("dotenv").config();

//Return all posts created
router.post("/", async (req, res, next) => {
  try {
    let posts;
    if (req.header("token") != "undefined" && req.header("token") != null) {
      const payload = jwt.verify(req.header("token"), process.env.jwtSecret);
      user = payload.user;
      posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "userName"],
          },
          {
            model: UserReact,
            attributes: ["liked"],
          },
        ],
      });
    } else {
      posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "userName"],
          },
        ],
      });
    }

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

//Create a post
router.post("/create", authorization, async (req, res) => {
  try {
    const { postTitle, postDescription, hairStyleImg } = req.body;
    const post = await Post.create({
      title: postTitle,
      description: postDescription,
      styleImgUrl: hairStyleImg,
      userID: req.user, //authorization middleware returns the user's id upon verification of jwtToken
    });

    res.status(200).json("Post created successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.delete("/delete", authorization, async (req, res) => {
  try {
    const { postID } = req.body;

    console.log(postID);
    const post = await Post.findOne({
      where: { id: `${postID}`, userID: `${req.user}` },
    });

    await post.destroy();
    res.status(200).json("Post deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.put("/react", authorization, async (req, res) => {
  try {
    const { postID, react } = req.body;

    console.log(react);
    //Update like or dislike counter
    const post = await Post.findOne({
      where: { id: `${postID}` },
    });

    if (react === "liked") {
      post.likes += 1;
    } else if (react === "notliked") {
      post.likes -= 1;
    } else if (react === "disliked") {
      post.disliked += 1;
    } else if (react === "notdisliked") {
      post.disliked -= 1;
    }

    await post.save();

    //Update user react records, used to show whether a user liked/disliked a post already
    if (react === "liked" || react === "disliked") {
      const userReact = await UserReact.findOne({
        where: { postId: `${postID}`, userId: `${req.user}` },
      });
      if (userReact === null) {
        await UserReact.create({
          userId: req.user,
          postId: postID,
          liked: react,
        });
      } else {
        userReact.liked = react;
        await userReact.save();
      }
    } else if (react === "notliked" || react === "notdisliked") {
      const userReact = await UserReact.findOne({
        where: { postId: `${postID}`, userId: `${req.user}` },
      });
      userReact.liked = "noreact";
      await userReact.save();
    }

    res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
