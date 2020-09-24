const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");

router.get("/", async (req, res, next) => {
  try {
    const dashShoes = await Sneaker.find();
    res.render("products_manage", { shoes: dashShoes });
  } catch (error) {
    next(error);
  }
});

router.get("/add", async (req, res, next) => {
  try {
    res.render("products_add");
  } catch (error) {
    next(error);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const newShoe = req.body;
    const createShoe = await Sneaker.create(newShoe);
    res.redirect("/products_add");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
