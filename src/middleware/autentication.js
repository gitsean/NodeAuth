const { verify } = require("../services/tokens");

const auth = {
  check: function(req, res, next) {
    const token = req.headers["x-auth-token"] || null;
    try {
      verify(token);
    } catch (e) {
      // TODO: Add logging
      console.error(e.name);
      console.error(e.message);
      return res.status(403).json({ error: "Forbidden!" });
    }
    next();
  }
};

module.exports = auth;
