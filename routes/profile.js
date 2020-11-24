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

module.exports = router;
