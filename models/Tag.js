const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new mongoose.Schema({
  label: {
    type: String,
    unique: true
  },
});

const TagModel = mongoose.model("tags", TagSchema);

module.exports = TagModel;
