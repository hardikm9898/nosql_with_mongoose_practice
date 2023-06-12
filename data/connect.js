const mongoose = require("mongoose");


const connect = mongoose
  .connect("mongodb://127.0.0.1:27017/practice")
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
 console.log(err)
  });

module.exports = connect;
