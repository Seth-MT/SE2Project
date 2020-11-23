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

// app connection and resources sharing setup
app.use(cors());
app.use(express.json()); //req.body

// if in production (deployment), changes main client path to build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

/* ROUTES */

// test route - this route is just a way for me to check that the backend route is connected and functioning
app.get("/", (req, res) => {
  res.send("Test");
});

/* User */
// user register and login
app.use("/auth", require("./routes/jwtAuth"));

// profile route --- couldnt think of anything else with execlusive content on the fly
app.use("/profile", require("./routes/profile"));

/* Product */
app.use("/products", require("./routes/productRouter"));

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
