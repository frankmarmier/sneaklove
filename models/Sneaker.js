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
  id_tags: { type: Schema.Types.ObjectId, ref: "Tag" }
});

const Sneaker = mongoose.model("Sneaker", sneakerSchema);

module.exports = Sneaker;
