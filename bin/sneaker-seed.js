require("dotenv").config();
const Sneaker = require("../models/Sneaker");
const mongoose = require("mongoose");

const sneakers = [
  {
    name: "Air Jordan",
    ref: "abcd",
    size: 42,
    description: "Shoe",
    price: 39.99,
    category: "men",
    id_tags: ["5f6caa39d4b18b333dd3f2ee"],
  },
  {
    name: "Stan Smith",
    ref: "edgh",
    size: 39,
    description: "Shoe",
    price: 79.99,
    category: "kids",
    id_tags: ["5f6caa39d4b18b333dd3f2ed"],
  },
  {
    name: "Converse",
    ref: "ghtkylk",
    size: 45,
    description: "Shoe",
    price: 56.99,
    category: "women",
    id_tags: ["5f6caa39d4b18b333dd3f2ef"],
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    Sneaker.create(sneakers)
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
