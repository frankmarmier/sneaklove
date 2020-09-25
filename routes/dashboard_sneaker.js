const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");
const uploader = require("../config/cloudinary");
const protectPrivateRoute = require("../middlewares/protectPrivateRoute");

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

router.get("/prod-add", protectPrivateRoute, async(req, res, next) => {
  try {
    const tags = await Tag.find()
    res.render("products_add", {tags});
  } catch (error) {
    next(error);
  }
});

router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
  
  const newSneakers = req.body;
  if (req.file) {
    newSneakers.image = req.file.path;
  }
  try {
    const newSneaker = await Sneaker.create(newSneakers);
    res.redirect("/sneakers/collection");
  } catch (error) {
    next(error);
  }
});

router.get("/prod-manage", protectPrivateRoute, async (req, res, next) => {
  try {
    
    const sneakers = await Sneaker.find();
    res.render("products_manage", { sneakers });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/delete", protectPrivateRoute, async (req, res, next) => {
  try {
    const sneakerId = req.params.id;
    await Sneaker.findByIdAndDelete(sneakerId);
    res.redirect("/prod-manage");
  } catch (error) {
    next(error);
  }
});

router.get("/product-edit/:id", protectPrivateRoute, async (req, res, next) => {
  try {
    const tags = await Tag.find();
    const sneakerId = req.params.id;
    const sneaker = await Sneaker.findById(sneakerId);
    res.render("product_edit", { sneaker, tags });
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
});

router.post("/createTag", async(req, res, next) => {
  try {
    const newTag = Tag.create(req.body);
    res.redirect("/prod-add");
  }
  catch(error) {
    next(error);
  }
})

module.exports = router;
