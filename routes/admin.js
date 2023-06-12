const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const router = express.Router();

const adminController = require("../controller/admin-controller");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/product", adminController.getAddProductPage); // ? Get Add Product Page
router.post("/product", adminController.addProduct); // ? add product

router.get("/products", adminController.getProductList); // ? show admin productlist

router.get("/product", adminController.getEditPage); // ? Get Edit Page with filled data
router.get("/product/:productId", adminController.getEditPage); // ? Get Edit Page with filled data
router.put("/product", adminController.updateProduct); // ? Update product data in edit page

router.delete("/product", adminController.deleteProduct); // ? Delete Product

module.exports = router;
