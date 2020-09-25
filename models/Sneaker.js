const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var category  = {
  values: ['men', 'women', 'kids']
, message: 'Category is required.'
}

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: {
    type: String
  , enum: category
  , trim: true
  },
  id_tags: { type: Schema.Types.ObjectId, ref: "Tag" },
  image: {
    type: String,
    default: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F11%2Ffiles%2F2019%2F08%2Fnike-sneakrs-day-paris-chasse-stash-drop-sacai-waffle-01.jpg",
  },
});

const Sneaker = mongoose.model("Sneaker", sneakerSchema);

module.exports = Sneaker;
