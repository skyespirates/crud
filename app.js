const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require("dotenv").config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

// ROUTES
const userRoutes = require("./routes/user");

mongoose
  .connect(DB_URL || "mongodb://localhost:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("CONNECTED TO MONGOO DB");
  })
  .catch((err) => {
    console.log("OH NO SOMETHING WENT WRONG");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// USER ROUTES
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`SERVING ON PORT: ${PORT}`);
});
