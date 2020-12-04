// initializes router and db
const router = require("express").Router();
const db = require("../db");

// links Style model and imports Op functions
const Style = require("../models/Style");
const { Op } = require("sequelize");

const authorization = require("../middleware/authorization");

// return all posts created
router.post("/", authorization, async (req, res) => {
  try {
    const styles = await Style.findAll();
    res.json(styles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// get all styles
router.get("/all", async (req, res) => {
  try {
    const styles = await Style.findAll();
    res.json(styles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// adds style
router.post("/add", async(req, res) => {
  try {
    const { name, type, hairLength, hairType, imageUrl } = req.body;
    
    Style.create({
      name: name,
      type: type,
      hairLength: hairLength,
      hairType: hairType,
      imageUrl: imageUrl
    });

    res.status(201).json("Style added");
  }
  catch (err){
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// searches for hair styles using query parameters that are entered by the user
router.get("/search/:query", async(req, res) => {
  var type;
  if (req.params.query.toLowerCase() == "straight") {
    type = 1;
  }
  else if (req.params.query.toLowerCase() == "wavy") {
    type = 2;
  }
  else if (req.params.query.toLowerCase() == "curly") {
    type = 3;
  }
  else if (req.params.query.toLowerCase() == "coily") {
    type = 4;
  }

  try {
      const styles = await Style.findAll({
          where: {
              [Op.or]: [
                  {
                    name: {
                      [Op.substring]: req.params.query
                      }
                  },
                  {
                    type: {
                      [Op.substring]: req.params.query
                    }
                  },
                  {
                    hairType: {
                      [Op.eq]: type
                    }
                  },
                  {
                    hairLength: {
                      [Op.substring]: req.params.query
                    }
                  }
              ]
          }
      })
      res.json(styles);
  }
  catch (error) {
      console.error(error.message)
      res.status(500).send("Server Error");
  }
});

// update style by id
router.put("/all/:id", async (req, res) => {
  try {
    const { name, type, hairLength, hairType, imageUrl } = req.body;

    const style = await Style.findOne({ 
      where: { id: req.params.id } 
    });

    if (!style) {
      res.status(404).json("Style not found");
    }

    if (name) {
      style.name = name;
    }
    
    if (type) {
      style.type = type;
    }
    
    if (hairType) {
      style.hairType = hairType;
    }

    if (hairLength) {
      style.hairLength = hairLength;
    }

    if (imageUrl) {
      style.imageUrl = imageUrl;
    }

    await style.save();

    res.status(200).json("Style updated successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Server Error");
  }
});

// delete a style by id
router.delete("/all/:id", async (req, res) => {
  try {

    const style = await Style.findOne({ 
      where: { id: req.params.id } 
    });

    if (!style) {
      res.status(404).json("Style not found");
    }

    await style.destroy();

    res.status(200).json("Style deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// get a style by id
router.get("/all/:id", async (req, res) => {
  try {

    const style = await Style.findOne({ 
      where: { id: req.params.id } 
    });

    if (!style) {
      res.status(404).json("Style not found");
    }

    res.status(200).json(style);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;