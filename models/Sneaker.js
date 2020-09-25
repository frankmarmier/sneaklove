const mongoose = require("mongoose");

const sneakerSchema = new mongoose.Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  image: String,
  category: {
    type: String,
    enum: ["men", "women", "kids"],
  },
  Id: { type: mongoose.Schema.Types.ObjectId },
});

const SneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = SneakerModel;
