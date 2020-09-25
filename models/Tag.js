const mongoose = require("mongoose");


const tagSchema = new mongoose.Schema({
  label: String,
});

const TagModel = mongoose.model("Tag", tagSchema);

module.exports = TagModel;
