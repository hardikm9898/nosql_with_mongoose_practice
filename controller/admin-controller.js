const Product = require("../model/product");
const { success, error } = require("../response-api/responseApi");
const { statusCode, message } = require("../constant/constant");

// ? Input : Title , Price, Description --- Output : Add Product to the Product Database

const addProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const product = new Product({
      title,
      price,
      description,
    });
    await product.save();
    res
      .status(statusCode.CREATED)
      .json(success("success", message.ADD_PRODUCT, res.statusCode));
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

// ? Output : Page with all products

const getProductList = async (req, res) => {
  try {
    const products = await Product.find();

    res
      .status(statusCode.SUCCESS)
      .json(success("success", { products }, res.statusCode));
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};
// ? Input: ProductID, EditMode --- Output: Edit Page with Data Populated

const getsingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (product) {
      res
        .status(statusCode.SUCCESS)
        .json(success("success", { product }, res.statusCode));
    } else {
      res
        .status(statusCode.NOT_FOUND)
        .json(error(message.PRODUCT_NOT_FOUND, res.statusCode));
    }
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

// ? Input: PID,title,price, description --- Output: UpdateThe Existed Data

const updateProduct = async (req, res) => {
  try {
    const { productId, title, price, description } = req.body;
    const chekProduct = await Product.findById(productId);
    if (chekProduct) {
      await Product.updateOne(
        { _id: productId },
        { title, price, description }
      );
      res
        .status(statusCode.SUCCESS)
        .json(success("success", message.DATA_UPDATED));
    } else {
      res
        .status(statusCode.NOT_FOUND)
        .json(error(message.PRODUCT_NOT_FOUND, res.statusCode));
    }
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

// ? Input: PID --- Output: Delete The Data

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const chekProduct = Product.findById(productId);
    if (chekProduct) {
      await Product.deleteOne({ _id: productId });
      res
        .status(statusCode.SUCCESS)
        .json(success("success", message.DATA_DELETED, res.statusCode));
    } else {
      res
        .status(statusCode.NOT_FOUND)
        .json(error(message.PRODUCT_NOT_FOUND, res.statusCode));
    }
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

module.exports = {
  deleteProduct,
  updateProduct,
  getsingleProduct,
  getProductList,
  addProduct,
};
