const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    profilePicture: String,
    location: String,
    blocked: Boolean,
    created: { type: Date, default: Date.now },
  }),
  User = mongoose.model("User", userSchema);

module.exports = User;
