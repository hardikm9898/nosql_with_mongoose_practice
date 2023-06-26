const express = require("express");
const {
  addProduct,
  getProductList,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controller/admin-controller");
const validator=require("../middleware/validation")

const { productSchema } = require("../validator/validate");

const router = express.Router();

router.get("/product/:productId", getSingleProduct); // ? Get Edit Page with filled data
router.post("/product",validator(productSchema), addProduct); // ? add product
router.get("/products", getProductList); // ? show admin productlist
router.put("/product/:productId",validator(productSchema), updateProduct); // ? Update product data in edit page
router.delete("/product/:productId", deleteProduct); // ? Delete Product

module.exports = router;
