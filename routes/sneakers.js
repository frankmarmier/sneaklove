const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");

router.get("/collection", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find();
    const tags = await Tag.find();
    const category = "whole";
    res.render("products", { sneakers, category, tags });
  } catch (err) {
    next(err);
  }
});

router.get("/men", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find({ category: "men" });
    const tags = await Tag.find();
    const category = "men";
    res.render("products", { sneakers, category, tags });
  } catch (err) {
    next(err);
  }
});

router.get("/women", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find({ category: "women" });
    const tags = await Tag.find();
    const category = "women";
    res.render("products", { sneakers, category, tags });
  } catch (err) {
    next(err);
  }
});

router.get("/kids", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find({ category: "kids" });
    const tags = await Tag.find();
    const category = "kids";
    res.render("products", { sneakers, category, tags });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
