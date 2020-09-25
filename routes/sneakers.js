const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");
const fileUploader = require("../config/cloudinary");

router.get("/collection", async (req, res) => {
  const dbResult = await Sneaker.find();
  console.log(dbResult);
  res.render("products", { sneakers: dbResult });
});

router.get("/one-product/:id", async (req, res) => {
  const productId = req.params.id;
  const dbResult = await Sneaker.findById(productId);
  console.log(dbResult);
  res.render("one_product", { sneaker: dbResult });
});

router.get("/:cat/products", async (req, res) => {
  const dbResult = await Sneaker.find({ category: req.params.cat });
  console.log(dbResult);
  res.render("products", { sneakers: dbResult });
});

module.exports = router;
