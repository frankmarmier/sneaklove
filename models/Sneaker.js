const mongoose = require("mongoose");

const sneakerSchema = new mongoose.Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: {
      type: String,
      enum: ["men", "women", "kids"]
  },
//   id: "mongoose.ObjectIds",
});

const SneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = SneakerModel;
