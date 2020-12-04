// initializes router and db 
const router = require("express").Router();
const db = require("../db");

// links Product model and imports Op functions for sequelize queries
const Product = require("../models/Product");
const { Op } = require("sequelize");


/* Product Controllers */
// get all products
router.get("/all", async(req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})

// search for products using some criteria (name, brand, type)
router.get("/search/", async(req, res) => {
    try {
        const{searchInput} = req.body

        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: searchInput
                        }
                    },
                    {
                        brand: {
                            [Op.startsWith]: searchInput
                        }
                    },
                    {
                        type: {
                            [Op.substring]: searchInput
                        }
                    }
                ]
            }
        })
        res.json(products);
    }
    catch (error) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
});


module.exports = router;