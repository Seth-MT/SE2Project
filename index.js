const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;
const User = require("./models/User");
app.use(cors());
app.use(express.json()); //req.body

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTES//

//register and login routes 
app.use("/auth", require("./routes/jwtAuth"));


//profile route --- couldnt think of anything else with execlusive content on the fly
app.use("/profile", require("./routes/profile"));


//Should the user enter a route that does not exist
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
