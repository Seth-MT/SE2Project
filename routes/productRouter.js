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
        console.error(error.message)
        res.status(500).send("Server Error");
    }
})

// adds product
router.post("/add", async(req, res) => {
    try {
      const { name, brand, type, description, imageUrl } = req.body;
      
      Product.create({
        name: name,
        brand: brand,
        type: type,
        description: description,
        imageUrl: imageUrl
      });
  
      res.status(201).json("Product added");
    }
    catch (err){
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  });

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

// get a product by id
router.get("/all/:id", async (req, res) => {
    try {
  
      const product = await Product.findOne({ 
        where: { id: req.params.id } 
      });
  
      if (!product) {
        res.status(404).json("Product not found");
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });

// delete a product by id
router.delete("/all/:id", async (req, res) => {
try {

    const product = await Product.findOne({ 
    where: { id: req.params.id } 
    });

    if (!product) {
    res.status(404).json("Style not found");
    }

    await product.destroy();

    res.status(200).json("Product deleted");
} catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
}
});

// update product by id
router.put("/all/:id", async (req, res) => {
    try {
      const { name, brand, type, description, imageUrl } = req.body;
  
      const product = await Product.findOne({ 
        where: { id: req.params.id } 
      });
  
      if (!product) {
        res.status(404).json("Style not found");
      }
  
      if (name) {
        product.name = name;
      }
      
      if (type) {
        product.type = type;
      }
      
      if (brand) {
        product.brand = brand;
      }
  
      if (description) {
        product.hairLength = description;
      }
  
      if (imageUrl) {
        product.imageUrl = imageUrl;
      }
  
      await product.save();
  
      res.status(200).json("Product updated successfully!");
    } catch (err) {
      console.error(err.message);
      res.status(400).json("Server Error");
    }
  });

module.exports = router;