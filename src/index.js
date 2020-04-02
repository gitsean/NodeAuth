const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const express = require("express");
const app = express();
const { check } = require("./middleware/autentication");

if (!config.get("PrivateKey")) {
  console.error("FATAL ERROR: PrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .set("useNewUrlParser", true)
  .set("useUnifiedTopology", true)
  .set("useCreateIndex", true)
  .connect("mongodb://localhost/mongo-games")
  .then(() => console.log("Now connected to MongoDB!"))
  .catch(err => console.error("Something went wrong", err));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);

// Protect all routes following with authentication
app.use(check);

app.use("/api/admin", admin);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
