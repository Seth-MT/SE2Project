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

//Update profile image and username
router.put("/update", authorization, async (req, res) => {
  try {
    const { profileImage, newName, dateOfBirth, sex, hairType, hairLength, bleach, coloring } = req.body;

    const user = await User.findOne({ where: { id: `${req.user}` } });

    if (newName != user.userName) {
      user.userName = newName;
      await user.save();
    }

    if (profileImage) {
      user.profileImage = profileImage;
      await user.save();
    }
    
    user.dateOfBirth = dateOfBirth;
    user.sex = sex;
    user.hairType = hairType;
    user.hairLength = hairLength;
    user.bleach = bleach;
    user.coloring = coloring;

    await user.save();

    res.status(200).json("File uploaded successfully!");
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

// update user info
router.get("/edit/", authorization, async (req, res) => {
  try {
    const { dateOfBirth, sex, hairType, hairLength, bleach, coloring } = req.body;

    const user = await User.findOne({
      where: {
        id: `${req.user}`
      },
    });
    
    user.dateOfBirth = dateOfBirth;
    user.sex = sex;
    user.hairType = hairType;
    user.hairLength = hairLength;
    user.bleach = bleach;
    user.coloring = coloring;

    await user.save();
    //res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;