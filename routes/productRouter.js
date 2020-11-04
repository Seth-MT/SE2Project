const router = require("express").Router();
const db = require("../db");
const Product = require("../models/Product");
const { Op } = require("sequelize");

// add product 
router.post("/add", async(req, res) =>{
    try {
        //destructure data passed from register form
        const { name, brand, description, imageUrl} = req.body;
       
        //check if user exists
        //userName is the same as ---    userName : `${userName}` 
        //const user = await User.findOne({ where: { userName } });
        
        /*if(user !== null){
            return res.status(401).send("User already exists")
        }*/
        
        //encrypt user password
        //const saltRounds = 10;
        //const salt = await bcrypt.genSalt(saltRounds)

        //const bcryptPassword = await bcrypt.hash(password, salt);

        //enter new user in database
        const newProduct = await Product.create({
            name,
            brand,
            description,
            imageUrl
        })
        
        //creating jwt token
        //const token = jwtGenerator(newUser.id);

        res.json({ message: "Product Added"});

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})


// load all products
router.get("/allproducts", async(req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})

router.get("/products-search/:id", async(req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.startsWith]: req.params.id
                }
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