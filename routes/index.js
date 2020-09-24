const express = require("express");
const SneakerModel = require("../models/Sneaker");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("index.hbs");
});

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find();
    res.render("products", { sneakers: sneakers });

    res.render("products");
  } catch (err) {
    next(err);
  }
});

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("/prod-add", (req, res, next) => {
  SneakerModel.create(req.body)
    .then((dbRes) => {
      res.redirect("/sneakers/collection");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/prod-manage", (req, res) => {
  res.render("products_manage");
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = router;
