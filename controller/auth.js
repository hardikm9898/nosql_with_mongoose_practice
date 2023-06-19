const bcrypt = require("bcrypt");

const { statusCode, message } = require("../constant/constant");
const User = require("../model/user-model");

const { success, error } = require("../response-api/responseApi");

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      res
        .status(statusCode.CONFLICT)
        .json(error(message.CONFLICT), res.statusCode);
    } else {
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
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);

      if (valid) {
        req.session.isAuth = true;
        res
          .status(statusCode.SUCCESS)
          .json(success("success", message.LOGEDIN, res.statusCode));
      } else {
        res
          .status(statusCode.VADIDATION_ERROR)
          .json(error(message.VALIDATION_ERROR, res.statusCode));
      }
    } else {
      res
        .status(statusCode.VADIDATION_ERROR)
        .json(error(message.VALIDATION_ERROR, res.statusCode));
    }
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};
const logout = async (req, res) => {
  try {
    req.session.destroy();
    res
      .status(statusCode.SUCCESS)
      .json(success("Success", message.LOGOUT, res.statusCode));
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

module.exports = {
  login,
  register,
  logout,
};
