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


//Searches for hair styles using query parameters that are entered by the user
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
      console.error(err.message)
      res.status(500).send("Server Error");
  }
});


module.exports = router;