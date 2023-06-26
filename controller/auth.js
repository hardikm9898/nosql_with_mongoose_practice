const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { statusCode, message } = require("../constant/constant");
const User = require("../model/user-model");

const { success, error, validation } = require("../response-api/responseApi");

const register = async (req, res) => {
  try {
    const registerError = validationResult(req);
    if (!registerError.isEmpty()) {
      res.status(422).json(validation(registerError.errors));
    } else {
      const { userName, email, password } = req.body;

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(statusCode.CONFLICT)
          .json(error(message.CONFLICT), res.statusCode);
      }
      const hashPassword = await bcrypt.hash(password, 12);

      user = new User({ userName, email, password: hashPassword });
      await user.save();
      res
        .status(statusCode.SUCCESS)
        .json(success("Success", message.REGISTERED, res.statusCode));
    }
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};
const login = async (req, res) => {
  try {
    const loginError = validationResult(req);
    if (!loginError.isEmpty()) {
      res.status(422).json(validation(loginError));
    } else {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user)
        return res
          .status(statusCode.VALIDATION_ERROR)
          .json(error(message.VALIDATION_ERROR, res.statusCode));

      const valid = await bcrypt.compare(password, user.password);

      if (!valid)
        return res
          .status(statusCode.VALIDATION_ERROR)
          .json(error(message.VALIDATION_ERROR, res.statusCode));

      const jwtToken = await jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      res
        .status(statusCode.SUCCESS)
        .json(success("success", message.LOGIN, res.statusCode));
    }
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

module.exports = {
  login,
  register,
};
