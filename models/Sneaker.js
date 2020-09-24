const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerShema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: {
    type: String,
    enum: ["men", "women", "kids"],
  },
  id_tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  image: String,
});

const Sneaker = mongoose.model("Sneaker", sneakerShema);

module.exports = Sneaker;
