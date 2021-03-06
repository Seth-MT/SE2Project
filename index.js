// backend modules and functions
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const pool = require("./db"); // db linkage

// port (environment variable or 5000 for local host default)
const PORT = process.env.PORT || 5000;

// models
const User = require("./models/User");
const Product = require("./models/Product");
const Post = require("./models/Post");
const Style = require("./models/Style");
const UserReact = require("./models/UserReact");
const Type = require('./models/Type');
const ProductType = require("./models/Product-Type");

// setup relationships in models
User.hasMany(Post, { foreignKey: "userID" });
Post.belongsTo(User, { foreignKey: "userID" });

User.belongsToMany(Post, { through: UserReact });
Post.belongsToMany(User, { through: UserReact });
UserReact.belongsTo(User);
UserReact.belongsTo(Post);
User.hasMany(UserReact);
Post.hasMany(UserReact);

// app connection and resources sharing setup
app.use(cors());
app.use(express.json()); //req.body

// if in production (deployment), changes main client path to build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

/* ROUTES */

// test route - this route is just a way for me to check that the backend route is connected and functioning
// delete this after development
app.get("/", (req, res) => {
  res.send("Server Running");
});

/* User */
// user register and login
app.use("/auth", require("./routes/jwtAuth"));

// route for user functions
app.use("/profile", require("./routes/profile"));


/* Products */
app.use("/products", require("./routes/productRouter"));

//posts route
app.use("/posts", require("./routes/posts"));

/* Styles */ 
app.use("/styles", require("./routes/styleRouter"));


// if a bad route is entered
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/public/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});