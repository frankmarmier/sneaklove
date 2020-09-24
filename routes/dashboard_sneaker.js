const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");

router.get("/", async (req, res, next) => {
  try {
    console.log("hey");
    const dashShoes = await Sneaker.find();
    res.render("products_manage", { shoes: dashShoes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
