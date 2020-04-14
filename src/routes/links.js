const bcrypt = require("bcrypt");
const { sign } = require("../services/tokens");
const { Link, validate } = require("../models/link");
const express = require("express");
const router = express.Router();
const { check } = require("../middleware/autentication");

router.get("/", async (req, res) => {
  const links = await Link.find();
  res.send(links);
});

router.post("/", check, async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { url, title, description } = req.body;
  const user = req.user;

  let existing = await Link.findOne({ title });
  if (existing) {
    return res.status(400).send("Your title must be unique!");
  }

  let link = new Link({
    url,
    title,
    description,
    user,
  });

  link = await link.save();
  let { _id } = link;
  const token = sign(_id);
  res.header("x-auth-token", token).send({ _id, title, description });
});

module.exports = router;
