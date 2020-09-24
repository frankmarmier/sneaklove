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

router.get("/:id/delete", async (req, res, next) => {
  try {
    const sneakerToDelete = req.params.id;
    console.log(sneakerToDelete);
    await Sneaker.findByIdAndDelete(sneakerToDelete);
    res.redirect("/sneakers/collection");
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  const selectedSneaker = await Sneaker.findById(req.params.id);
  res.render("product_edit", { selectedSneaker });
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const sneakerId = req.params.id;
    const newSneakerValue = req.body;
    await Sneaker.findByIdAndUpdate(sneakerId, newSneakerValue);
    res.redirect("/sneakers/collection");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
