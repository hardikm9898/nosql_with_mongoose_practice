const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
require("./data/connect");

const { PORT } = process.env;

const app = express();
const isAuth = require("./middleware/isAuth");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const homeroutes = require("./routes/user");

// middleware

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded());

app.use("/admin", isAuth, adminRoutes);

app.use("/auth", authRoutes);

app.use(homeroutes); // ? path filtering

app.listen(PORT, () => {
  console.log(`server is  running on ${PORT}`);
});
