const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const Sneaker = require("../models/Sneaker");

router.get("/collection", async (req, res, next) => {
    try {
      const sneakers = await Sneaker.find();
      const category = "whole"
      res.render("products", { sneakers, category });
    } catch (err) {
      next(err);
    }
  });

router.get("/men", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find({ category: "men" });
    const category = 'men'
    res.render("products", { sneakers, category });
  } catch (err) {
    next(err);
  }
});

router.get("/women", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find({ category: "women" });
    const category = 'women'
    res.render("products", { sneakers, category });
  } catch (err) {
    next(err);
  }
});

router.get("/kids", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find({ category: "kids" });
    const category = 'kids'
    res.render("products", { sneakers, category });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
