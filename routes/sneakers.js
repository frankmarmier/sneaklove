const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");

router.get("/one-product/:id", async (req, res) => {
  const productId = req.params.id;
  const dbResult = await Sneaker.findById(productId);
  res.render("one_product", { sneaker: dbResult, css: ["one-product"] });
});

router.get("/all-products", async (req, res) => {
  const dbResult = await Sneaker.find();
  res.render("products", { sneakers: dbResult, css: ["products"] });
});

module.exports = router;
