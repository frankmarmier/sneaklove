const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SneakerSchema = new mongoose.Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  id_tags: { type: Schema.Types.ObjectId, ref: "Tag" },
  category: {
    type: String,
    enum: ["men", "women", "kids"],
  }
});

const SneakerModel = mongoose.model("sneakers", SneakerSchema);

module.exports = SneakerModel;
