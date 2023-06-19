const express = require("express");
const {
  addProduct,
  getProductList,
  updateProduct,
  deleteProduct,
  getsingleProduct,
} = require("../controller/admin-controller");

const router = express.Router();

router.get("/product/:productId", getsingleProduct); // ? Get Edit Page with filled data
router.post("/product", addProduct); // ? add product
router.get("/products", getProductList); // ? show admin productlist
router.put("/product", updateProduct); // ? Update product data in edit page
router.delete("/product", deleteProduct); // ? Delete Product

module.exports = router;
