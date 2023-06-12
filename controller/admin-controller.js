const Product = require("../model/product");
const { success, error } = require("../response-api/responseApi");

// ? Output: Render Add Product Page

const getAddProductPage = (req, res) => {
  try {
    res.status(200).json(
      success(
        "success",
        {
          message: " Add Product Page",
        },
        res.statusCode
      )
    );
  } catch (err) {
    res.status(500).json(error("Something Went to Wrong", res.statusCode));
  }
};

// ? Input : Title , Price, Description --- Output : Add Product to the Product Database

const addProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;

    const product = new Product({
      title,
      price,
      description,
      userId: req.user,
    });

    await product.save();

    res
      .status(201)
      .json(success("success", { message: "Product Added" }, res.statusCode));
  } catch (err) {
    res.status(500).json(error("Something Want to Wrong", res.statusCode));
  }
};

// ? Output : Page with all products

const getProductList = async (req, res) => {
  try {
    const AllProductData = await Product.find();

    res
      .status(200)
      .json(success("success", { products: AllProductData }, res.statusCode));
  } catch (err) {
    res.status(500).json(error("Something Went Wrong", res.statusCode));
  }
};

// ? Input: ProductID, EditMode --- Output: Edit Page with Data Populated

const getEditPage = async (req, res) => {
  try {
    const id = req.params.productId;
    const data = await Product.findById(id);
    res.status(200).json(success("success", { product: data }, res.statusCode));
  } catch (err) {
    res.status(500).json(error("Something Went Wrong", res.statusCode));
  }
};

// ? Input: PID,title,price, description --- Output: UpdateThe Existed Data

const updateProduct = async (req, res) => {
  try {
    const { productId, title, price, description } = req.body;

       await Product.updateOne(
      { _id: productId },
      { title, price, description }
    );

    res.status(200).json(success("success", { message: "Data Updated" }));
  } catch (err) {
    res
      .status(404)
      .json(
        res.status(500).json(error("Something Went Wrong", res.statusCode))
      );
  }
};

// ? Input: PID --- Output: Delete The Data

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    await Product.deleteOne({ _id: productId });

    res
      .status(202)
      .json(
        success(
          "success",
          { message: "Data successfully Deleted" },
          res.statusCode
        )
      );
    // }
  } catch (err) {
    res
      .status(200)
      .json(
        res
          .status(500)
          .json(
            res.status(500).json(error("Something Went Wrong", res.statusCode))
          )
      );
  }
};

module.exports = {
  getAddProductPage,
  deleteProduct,
  updateProduct,
  getEditPage,
  getProductList,
  addProduct,
};
