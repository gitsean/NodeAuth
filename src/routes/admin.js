const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.get("/", async (req, res) => {
  console.log("req.body", req.body);

  console.log("req.user", req.user);

  const { error } = validate(req.headers);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

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
