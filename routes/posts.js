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
    //If the user has a token then verify the user and return User and UserReact information as part of the JSON Array. Otherwise return only basic post information
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
    console.log(posts);
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
    //Find the post that the user wishes to delete
    const post = await Post.findOne({
      where: { id: `${postID}`, userID: `${req.user}` },
    });

    //Destroy all userreacts that involve this post
    await UserReact.destroy({
      where: { postId: `${postID}` },
    });

    //destroy the post
    await post.destroy();
    res.status(200).json("Post deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.put("/upLike", authorization, async (req, res) => {
  try {
    const { postID, react } = req.body;
    console.log(react);

    //if a reaction does not exist for this user on a particular post in UserReacts table then create a new record, if reaction exists then update it to liked
    if (react === "liked") {
      //Find the post
      const post = await Post.findOne({
        where: { id: `${postID}` },
      });

      //Find the UserReact record
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

      //update the number of likes the post has
      post.likes += 1;

      //If the value previously stored in the UserReact row was dislike then also decrement the number of likes for the post
      if (userReact.liked === "disliked") {
        post.dislikes -= 1;
      }

      await post.save();
    }

    res.status(200).json("Success");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.put("/unLike", authorization, async (req, res) => {
  try {
    const { postID, react } = req.body;
    console.log(react);

    //If a reaction exists for a post(as it should because in order to undislike a user must have liked previously) then update it to no reaction
    if (react === "noreact") {
      //Find the post
      const post = await Post.findOne({
        where: { id: `${postID}` },
      });

      //Find the UserReact record
      const userReact = await UserReact.findOne({
        where: { postId: `${postID}`, userId: `${req.user}` },
      });

      //In order to unlike a post the reaction must exist already
      if (userReact != null) {
        userReact.liked = react;
        await userReact.save();
      }

      //update the number of likes the post has
      post.likes -= 1;

      await post.save();
    }

    res.status(200).json("Success");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.put("/upDislike", authorization, async (req, res) => {
  try {
    const { postID, react } = req.body;
    console.log(react);

    //if a reaction does not exist for this user on a particular post in UserReacts table then create a new record, if reaction exists then update it to disliked
    if (react === "disliked") {
      //Find the post
      const post = await Post.findOne({
        where: { id: `${postID}` },
      });

      //Find the UserReact record
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

      //update the number of dislikes the post has
      post.dislikes += 1;

      //If the value previously stored in the UserReact row was liked then also decrement the number of dislikes for the post
      if (userReact.liked === "liked") {
        post.likes -= 1;
      }

      await post.save();
    }

    res.status(200).json("Success");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.put("/unDislike", authorization, async (req, res) => {
  try {
    const { postID, react } = req.body;
    console.log(react);

    //If a reaction exists for a post(as it should because in order to undislike a user must have disliked previously) then update it to no reaction
    if (react === "noreact") {
      //Find the post
      const post = await Post.findOne({
        where: { id: `${postID}` },
      });

      //Find the UserReact record
      const userReact = await UserReact.findOne({
        where: { postId: `${postID}`, userId: `${req.user}` },
      });

      //In order to unlike a post the reaction must exist already
      if (userReact != null) {
        userReact.liked = react;
        await userReact.save();
      }

      //update the number of dislikes the post has
      post.dislikes -= 1;

      await post.save();
    }

    res.status(200).json("Success");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});
module.exports = router;
