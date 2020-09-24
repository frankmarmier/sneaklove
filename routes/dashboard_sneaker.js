const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const Sneaker = require("../models/Sneaker");

router.get("/collection", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find();
    res.render("products_manage", { sneakers });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
