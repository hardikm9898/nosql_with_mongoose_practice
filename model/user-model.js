const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: ObjectId,
          ref: "Product",
          required: true,
        },
        quentity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const updateQuentity = 1;
  const cartItem = this.cart.items.find(
    (item) => item.productId.toString() == product._id.toString()
  );

  if (cartItem) {
    cartItem.quentity += updateQuentity;
  } else {
    this.cart.items.push({ productId: product._id, quentity: updateQuentity });
  }
  this.save();
};

module.exports = mongoose.model("User", userSchema);
