// initializes router and db 
const router = require("express").Router();
const db = require("../db");

// links Product model and imports Op functions for sequelize queries
const Product = require("../models/Product");
const { Op } = require("sequelize");


/* Product Controllers */
// add product 
// router.post("/add", async(req, res) =>{
//     try {
//         const { name, brand, description, imageUrl} = req.body;
       
//         const newProduct = await Product.create({
//             name,
//             brand,
//             description,
//             imageUrl
//         })
        
//         res.json({ message: "Product Added"});

//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send("Server Error");
//     }
// })


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
router.get("/search/:query", async(req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: req.params.query
                        }
                    },
                    {
                        brand: {
                            [Op.startsWith]: req.params.query
                        }
                    },
                    {
                        type: {
                            [Op.substring]: req.params.query
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