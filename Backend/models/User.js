// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_email: { type: String, unique: true, required: true },
  user_phone: { type: String, unique: true, required: false },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
