const express = require("express");
const {
  addProduct,
  getProductList,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controller/admin-controller");

const router = express.Router();

router.get("/product/:productId", getSingleProduct); // ? Get Edit Page with filled data
router.post("/product", addProduct); // ? add product
router.get("/products", getProductList); // ? show admin productlist
router.put("/product/:productId", updateProduct); // ? Update product data in edit page
router.delete("/product/:productId", deleteProduct); // ? Delete Product

module.exports = router;
