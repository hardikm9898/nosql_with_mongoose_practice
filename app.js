const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
require("./data/connect");
const session = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(session);

const { PORT } = process.env;
const User = require("./model/user-model");

const store = new MongoDBStore({
  uri: process.env.URL,
  collection: "mysession",
});

const app = express();
const isAuth = require("./middleware/isAuth");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const homeroutes = require("./routes/user");
const { statusCode, message } = require("./constant/constant");
const { error } = require("./response-api/responseApi");
// middleware

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded());

app.use(
  session({
    secret: "bhagu",
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store,
  })
);

app.use(async (req, res, next) => {
  try {
    const user = await User.findById({ _id: "648ae9322c8c1da0afa4282a" });
    if (user) {
      req.user = user;
      next();
    } else {
      res
        .status(statusCode.NOT_FOUND)
        .json(error(message.USER_NOT_FOUND, res.statusCode));
    }
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
});

app.use("/admin", isAuth, adminRoutes);

app.use("/auth", authRoutes);

app.use(homeroutes); // ? path filtering

app.listen(PORT, () => {
  console.log(`server is  running on ${PORT}`);
});
