const { verify } = require("../services/tokens");
const { User } = require("../models/user");

const auth = {
  check: async function (req, res, next) {
    const token = req.headers["x-auth-token"] || null;
    try {
      const decoded = verify(token);
      const { _id } = decoded;
      req.user = _id;
    } catch (e) {
      // TODO: Add logging
      return res.status(403).json({ error: "Forbidden!" });
    }
    next();
  },
};

module.exports = auth;
