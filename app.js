const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connect = require("./data/connect");
require("dotenv").config();

const { PORT } = process.env;

const User = require("./model/user-model");

const app = express();

const adminRoutes = require("./routes/admin");
const homeroutes = require("./routes/user");

// middleware

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded());

app.use(async (req, res, next) => {
  try {
    const user = await User.findById({ _id: "64847c9223784a715f01f8a4" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error)
  }
});

app.use("/admin", adminRoutes);
app.use(homeroutes); // ? path filtering

app.listen(PORT, () => {
  console.log(`server is  running on ${PORT}`);
});
