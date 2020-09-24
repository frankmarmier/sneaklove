const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");

router.get("/prod-manage", async (req, res, next) => {
  try {
    const dashShoes = await Sneaker.find();
    res.render("products_manage", { sneakers: dashShoes });
  } catch (error) {
    next(error);
  }
});

router.get("/prod-add", async (req, res, next) => {
  try {
    res.render("products_add");
  } catch (error) {
    next(error);
  }
});

router.post("/prod-add", async (req, res, next) => {
  try {
    const newShoe = req.body;
    console.log(newShoe);
    const createShoe = await Sneaker.create(newShoe);
    res.redirect("/prod-manage");
  } catch (error) {
    next(error);
  }
});

router.get("/product-delete/:id", (req, res, next) => {
  console.log("toto");
  const SneakerId = req.params.id;
  Sneaker.findByIdAndDelete(SneakerId)
    .then((dbResult) => {
      res.redirect("/");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
