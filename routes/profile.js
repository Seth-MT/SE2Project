const router = require("express").Router();
const db = require("../db");
const User = require("../models/User");
const authorization = require("../middleware/authorization");

router.post("/", authorization, async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["userName"],
      where: { id: `${req.user}` },
    });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// get all users
router.get("/all", async(req, res) => {
  try {
      const users = await User.findAll();
      res.json(users);
  } catch (error) {
      console.error(error.message)
      res.status(500).send("Server Error");
  }
})

// update user info
router.put("/edit/:id", async(req, res) => {
  try {
    const { dateOfBirth, sex, hairType, hairLength, bleach, coloring } = req.body;

    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    });

    user.dateOfBirth = dateOfBirth;
    user.sex = sex;
    user.hairType = hairType;
    user.hairLength = hairLength;
    user.bleach = bleach;
    user.coloring = coloring;

    await user.save();
    res.json(user);
  }
  catch (error){
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;