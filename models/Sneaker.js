const mongoose = require("mongoose");

const sneakerSchema = new mongoose.Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: String[(men, women, kids)],
  id_tags: [ObjectId],
});

const SneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = SneakerModel;
