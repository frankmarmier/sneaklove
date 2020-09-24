const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const Sneaker = require("../models/Sneaker");

router.get("/create", (req, res, next) => {
  res.render("products_add");
});

router.post("/create", async (req, res, next) => {
  try {
    const newSneaker = req.body;
    console.log(newSneaker);
    await Sneaker.create(newSneaker);
    res.redirect("collection");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
