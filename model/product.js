const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", productSchema);
