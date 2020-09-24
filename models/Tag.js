const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  label: String,
});

const TagModel = mongoose.model("tags", TagSchema);

module.exports = TagModel;
