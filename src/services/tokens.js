const jwt = require("jsonwebtoken");
const config = require("config");

const options = {
  expiresIn: "1h"
};

const key = config.get("PrivateKey");

const token = {
  sign: function token(_id) {
    return jwt.sign({ _id }, key, options);
  },
  verify: function verify(token) {
    return jwt.verify(token, key);
  }
};

module.exports = token;
