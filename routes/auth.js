const express = require("express");

const router = express.Router();

const { loginValidator, signUpValidator } = require("../validator/validate");

const { register, login } = require("../controller/auth");

router.post("/register", signUpValidator, register);

router.post("/login", loginValidator, login);

module.exports = router;
