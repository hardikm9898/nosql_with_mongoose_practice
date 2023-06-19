const { error } = require("../response-api/responseApi");
const { statusCode,message } = require("../constant/constant");

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.status(statusCode.UNAUTHORIZED).json(error(message.LOGINFIRTS));
  }
};

module.exports = isAuth;
