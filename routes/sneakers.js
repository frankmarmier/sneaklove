const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");

router.get("/one-product/:id", async (req, res) => {
  const productId = req.params.id;
  const dbResult = await Sneaker.findById(productId);
  res.render("one_product", { sneaker: dbResult });
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});

router.get("/:id", (req, res) => {
  res.render("one_product");
});

module.exports = router;
