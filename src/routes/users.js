const bcrypt = require("bcrypt");
const { sign } = require("../services/tokens");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // First Validate The Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exisits!");
  } else {
    // Insert the new user if they do not exist yet
    let { name, email, password } = req.body;
    user = new User({
      name,
      email,
      password
    });
    const salt = await bcrypt.genSalt(10);
    try {
      user.password = await bcrypt.hash(user.password, salt);
    } catch (e) {
      console.log("e", e);
    }

    user = await user.save();
    let { _id } = user;
    const token = sign(_id);
    res.header("x-auth-token", token).send({ _id, name, email });
  }
});

module.exports = router;
