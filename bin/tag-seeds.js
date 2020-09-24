require("dotenv").config();
const TagModel = require("../models/Tag");
const mongoose = require("mongoose");

const tags = [
  { label: "running shoe" },
  { label: "basketball shoe" },
  { label: "walking shoe" },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    TagModel.create(tags)
      .then((dbResult) => {
        console.log(dbResult);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
