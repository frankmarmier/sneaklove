const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");

router.get("/sneakers/men", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find({ category: "men" });
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});

router.get("/sneakers/women", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find({ category: "women" });
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});

router.get("/sneakers/kids", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find({ category: "kids" });
    res.render("products", { sneakers });
  } catch (error) {
    next(error);
  }
});

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("/prod-add", async (req, res, next) => {
  try {
    const newSneaker = await Sneaker.create(req.body);
    res.redirect("/sneakers/collection");
  } catch (error) {
    next(error);
  }
});

router.get("/prod-manage", async (req, res, next) => {
  try {
    
    const sneakers = await Sneaker.find();
    res.render("products_manage", { sneakers });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/delete", async (req, res, next) => {
  try {
    const sneakerId = req.params.id;
    await Sneaker.findByIdAndDelete(sneakerId);
    res.redirect("/prod-manage");
  } catch (error) {
    next(error);
  }
});

router.get("/product-edit/:id", async (req, res, next) => {
  try {
    const sneakerId = req.params.id;
    const sneaker = await Sneaker.findById(sneakerId);
    res.render("product_edit", { sneaker });
  } catch (error) {
    next(error);
  }
});

router.post ("/prod-edit/:id", async (req, res, next)=>{
  try {
    const sneakerId = req.params.id;
    const sneaker = await Sneaker.findByIdAndUpdate(sneakerId, req.body)
    res.redirect("/prod-manage");
    
  } catch (error) {
    next(error);
    
  }
})

module.exports = router;
