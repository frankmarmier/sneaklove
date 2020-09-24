const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tag = new Schema({
    label:String,
});

const TagModel = mongoose.model("Tag", Tag);

module.exports = TagModel;