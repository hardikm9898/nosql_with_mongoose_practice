const express = require("express");

const { postCart } = require("../controller/user-controller");

const router = express.Router();

router.post("/cart", postCart);

module.exports = router;
