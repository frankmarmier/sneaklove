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
    res.redirect("/sneakers/collection")
  } catch (err) {
    next(err);
  }
});

module.exports = router;
