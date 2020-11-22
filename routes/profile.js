const router = require("express").Router();
const db = require("../db");
const User = require("../models/User");
const authorization = require("../middleware/authorization");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profile");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

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

router.put(
  `/icon`,
  authorization,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: `${req.user}` } });
      const img =
        // http://localhost:5000/
        "https://thehairthing.herokuapp.com/" +
        req.file.path.replace("uploads\\profile\\", "");
      user.profileImage = img;
      await user.save();

      res.status(200).json("File uploaded successfully!");
    } catch (err) {
      console.error(err.message);
      res.status(400).json("Please upload jpeg or png");
    }
  }
);

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
router.get("/edit/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    user.sex = "Male";
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
