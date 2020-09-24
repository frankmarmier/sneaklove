const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const uploader = require("../config/cloudinary");
const protectPrivateRoute = require("../middlewares/protectPrivateRoute")


const Sneaker = require("../models/Sneaker");

router.get("/create", (req, res, next) => {
  res.render("products_add");
});

router.get("/manage", protectPrivateRoute, async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find();
    res.render("products_manage", { sneakers });
  } catch (err) {
    next(err);
  }
});

router.post("/create", protectPrivateRoute, async (req, res, next) => {
  try {
    const newSneaker = req.body;
    console.log(newSneaker);
    await Sneaker.create(newSneaker);
    res.redirect("/sneakers/manage");
  } catch (error) {
    next(error);
  }
});

router.get("/:id/delete", protectPrivateRoute, async (req, res, next) => {
  try {
    const sneakerToDelete = req.params.id;
    console.log(sneakerToDelete);
    await Sneaker.findByIdAndDelete(sneakerToDelete);
    res.redirect("/sneakers/manage");
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", protectPrivateRoute, async (req, res, next) => {
  const selectedSneaker = await Sneaker.findById(req.params.id);
  res.render("product_edit", { selectedSneaker });
});

router.post("/:id/edit", protectPrivateRoute, async (req, res, next) => {
  try {
    const sneakerId = req.params.id;
    const newSneakerValue = req.body;
    await Sneaker.findByIdAndUpdate(sneakerId, newSneakerValue);
    res.redirect("/sneakers/manage");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
