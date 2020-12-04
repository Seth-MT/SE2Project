const router = require("express").Router();
const db = require("../db");
const Style = require("../models/Style");
const authorization = require("../middleware/authorization");

//Return all posts created
router.post("/", async (req, res) => {
  try {
    const styles = await Style.findAll();
    res.json(styles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
