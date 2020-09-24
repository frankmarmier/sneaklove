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
  const SneakerId = req.params.id;
  Sneaker.findByIdAndDelete(SneakerId)
    .then((dbResult) => {
      res.redirect("/prod-manage");
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/product-edit/:id", async (req, res, next) => {
  try {
    const sneakerId = req.params.id;
    dbresult = await Sneaker.findById(sneakerId);
    Sneaker.findByIdAndUpdate(sneakerId);
    res.render("product_edit", { sneaker: dbresult });
  } catch (error) {
    next(error);
  }
});

router.post("/product-edit/:id", async (req, res, next) => {
  try {
    const sneakerId = req.params.id;
    const updatedSneaker = await Sneaker.findByIdAndUpdate(sneakerId, req.body);
    res.redirect("/prod-manage");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
