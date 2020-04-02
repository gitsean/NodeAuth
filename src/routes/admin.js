const express = require("express");
const router = express.Router();
const { verify } = require("../services/tokens");
const Joi = require("joi");

router.get("/", async (req, res) => {
  console.log("req.headers", req.headers);

  const { error } = validate(req.headers);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const token = req.headers["x-auth-token"] || null;
  const verified = verify(token);
  console.log("verified", verified);
  res.send("OK");

  function validate(req) {
    const schema = Joi.object()
      .keys({
        "x-auth-token": Joi.string().required()
      })
      .unknown(true);
    return Joi.validate(req, schema);
  }
});

module.exports = router;
