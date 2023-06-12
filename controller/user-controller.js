const Product = require("../model/product");
const{success,error}=require("../response-api/responseApi")

const getCart = async (req, res) => {
  try {
    const cartsdetails = await req.user.cart;
    res
      .status(200)
      .json(success("success", { cart: cartsdetails }, res.statusCode));
  } catch (err) {
    res.status(500).json(error("Something went wrong", res.statusCode));
  }
};

const postCart = async (req, res) => {
  try {
    const id = req.body.productId;

    const product = await Product.findOne({ _id: id });

    await req.user.addToCart(product);

    res
      .status(200)
      .json(
        success(
          "success",
          { message: "product added into cart" },
          res.statusCode
        )
      );
   
  } catch (err) {
    res.status(500).json(error("Something went wrong", res.statusCode));
  }
};

module.exports = { postCart, getCart };
