const router = require("express").Router();
const db = require("../db");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

//register route
router.post("/register", async (req, res) => {
  try {
    //destructure data passed from register form
    const { firstName, lastName, userName, email, password } = req.body;

    //check if user exists
    //userName is the same as ---    userName : `${userName}`
    const user = await User.findOne({ where: { userName } });

    if (user !== null) {
      return res.status(401).json("User already exists");
    }

    //encrypt user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //enter new user in database
    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: bcryptPassword,
      profileImage:
        "https://www.searchpng.com/wp-content/uploads/2019/02/Profile-ICon.png",
    });

    //creating jwt token
    const token = jwtGenerator(newUser.id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    //destructure the req.body
    const { userName, password } = req.body;

    //check if user doesn't exist
    const user = await User.findOne({ where: { userName } });

    if (user === null) {
      return res.status(401).json("Username or Password is invalid");
    }

    //check if incoming password is the same as db password

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json("Password or Username is invalid");
    }

    //send client jwt token
    const token = jwtGenerator(user.id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
