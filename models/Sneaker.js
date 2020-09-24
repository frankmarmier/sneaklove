const mongoose = require("mongoose");

const SneakerSchema = new mongoose.Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: String[(men, women, kids)],
  id_tags: [ObjectId],
});

const SneakerModel = mongoose.model("sneakers", SneakerSchema);

module.exports = SneakerModel;
