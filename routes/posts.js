const router = require("express").Router();
const db = require("../db");
const Post = require("../models/Post");
const authorization = require("../middleware/authorization");

//Return all posts created
router.post("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
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

module.exports = router;
