// initializes database with json files
// populates the respective tables with data

const fs = require("fs"); // file system module to read data from files
const db = require("./db");

// imports models to create table records
const Product = require("./models/Product");
const Style = require("./models/Style");
const Type = require("./models/Type");
const ProductType = require("./models/Product-Type");

// reads the products.json file and creates records in the Product table
fs.readFile("./data/products.json", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  const products = JSON.parse(data.toString());

  for (var i = 0; i < products.length; i++){
    Product.create({
      name: products[i].name,
      brand: products[i].brand,
      type: products[i].type,
      description: products[i].description,
      imageUrl: products[i].imageUrl
    });
  }
});

// reads the types.json file and creates records in the Type table
fs.readFile("./data/types.json", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  const types = JSON.parse(data.toString());

  for (var i = 0; i < types.length; i++){
    Type.create({
      type: types[i].type,
      category: types[i].category
    });
  }
});

// reads the styles.json file and creates records in the Style table
fs.readFile("./data/styles.json", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  const styles = JSON.parse(data.toString());

  for (var i = 0; i < styles.length; i++){
    Style.create({
      name: styles[i].name,
      type: styles[i].type,
      hairLength: styles[i].hairLength,
      hairType: styles[i].hairType,
      imageUrl: styles[i].imageUrl
    });
  }
});

// reads the product-types.json file and creates records in the ProductStyle table
fs.readFile("./data/product-types.json", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  const producttypes = JSON.parse(data.toString());

  for (var i = 0; i < producttypes.length; i++){
    ProductType.create({
      productID: producttypes[i].productID,
      typeID: producttypes[i].typeID,
    });
  }
});