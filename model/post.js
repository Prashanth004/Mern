const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PostSchema = new Schema({
  userId: String,
  category: String,
  subCategory: String,
  image: String,
  text: String,
  location: String,
  allowed: Boolean,
  title: String,
  created: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model("Product", PostSchema);
