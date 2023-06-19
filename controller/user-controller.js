const { statusCode, message } = require("../constant/constant");
const Product = require("../model/product");
const { success, error } = require("../response-api/responseApi");

const postCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (product) {
      await req.user.addToCart(product);
      res
        .status(statusCode.SUCCESS)
        .json(
          success("success", message.PRODUCT_ADDED_IN_CART, res.statusCode)
        );
    } else {
      res
        .status(statusCode.NOT_FOUND)
        .json(error(message.NOT_FOUND, res.statusCode));
    }
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};
module.exports = { postCart };
