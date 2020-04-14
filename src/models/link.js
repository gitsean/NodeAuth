const Joi = require("joi");
const mongoose = require("mongoose");

const Link = mongoose.model(
  "Link",
  new mongoose.Schema({
    url: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    user: {
      type: String,
      required: true,
    },
  })
);

function validateLink(link) {
  const schema = {
    url: Joi.string().min(5).max(255).required(),
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).max(255),
  };
  return Joi.validate(link, schema);
}

exports.Link = Link;
exports.validate = validateLink;
