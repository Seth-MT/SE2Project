const router = require("express").Router();
const db = require("../db");
const User = require("../models/User");
const authorization = require("../middleware/authorization");

//Return username and profile image to profile
router.post("/", authorization, async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["userName", "profileImage"],
      where: { id: `${req.user}` },
    });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// update user record
router.put("/update", authorization, async (req, res) => {
  try {
    const {
      profileImage,
      newName,
      dateOfBirth,
      sex,
      hairType,
      hairLength,
      bleach,
      coloring,
    } = req.body;

    const user = await User.findOne({ where: { id: `${req.user}` } });

    if (newName && newName != user.userName) {
      user.userName = newName;
    }

    if (profileImage) {
      user.profileImage = profileImage;
    }

    if (dateOfBirth) {
      user.dateOfBirth = dateOfBirth;
    }

    if (sex) {
      user.sex = sex;
    }

    if (hairType) {
      user.hairType = hairType;
    }

    if (hairLength) {
      user.hairLength = hairLength;
    }

    if (bleach) {
      user.bleach = bleach;
    }

    if (coloring) {
      user.coloring = coloring;
    }

    await user.save();

    res.status(200).json("User updated successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Server Error");
  }
});

//Check if user exists
router.post("/userExists", authorization, async (req, res) => {
  try {
    const { newName } = req.body;
    //Find original user
    const originalUser = await User.findOne({ where: { id: `${req.user}` } });

    //check if user exists
    const user = await User.findOne({ where: { userName: newName } });

    if (user != null && originalUser.userName === newName) {
      res.status(200).json("No change");
    } else if (user != null) {
      return res.status(200).json("User already exists");
    } else if (user === null) {
      return res.status(200).json("Name available!");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// delete a user where userID = id
router.delete("/user/:id", async (req, res) => {
  try {

    const user = await User.findOne({ 
      where: { id: req.params.id } 
    });

    if (!user) {
      res.status(500).json("User not found");
    }

    res.status(200).json("User deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// get a user where userID = id
router.get("/user/:id", async (req, res) => {
  try {

    const user = await User.findOne({ 
      where: { id: req.params.id } 
    });

    if (!user) {
      res.status(500).json("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
