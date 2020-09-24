const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerShema = new Schema({
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
  id_tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
});

const Sneaker = mongoose.model("Sneaker", sneakerShema);

module.exports = Sneaker;
