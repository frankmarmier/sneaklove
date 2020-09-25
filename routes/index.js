const express = require("express");
const SneakerModel = require("../models/Sneaker");
const router = express.Router();
const uploader = require("../config/cloudinary");
const TagModel = require("../models/Tag");

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.render("index");
});

router.get("/prod-add", async (req, res) => {
  try {
    const tags = await TagModel.find();
    res.render("products_add", {tags} );
  } catch (err) {
    console.log(err);
  }
});

router.get("/prod-manage", async (req, res) => {
  try {
    const sneakers = await SneakerModel.find();
    res.render("products_manage", { sneakers: sneakers });
  } catch (err) {
    console.log(err);
  }
});

router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
  try {
    const newSneaker = req.body;
    if (req.file) {
      newSneaker.image = req.file.path;
    }
    const sneaker = await SneakerModel.create(newSneaker);
    res.redirect("/sneakers/collection");
  } catch (err) {
    console.log(err);
  }
});

router.get("/sneakers/collection", async (req, res) => {
  try {
    const sneakers = await SneakerModel.find();
    console.log("this is sneakers" + sneakers);
    res.render("products", { sneakers: sneakers });
  } catch (error) {
    console.log(error);
  }
});

router.get("/one-product/:id", async (req, res) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    res.render("one_product", { sneaker });
  } catch (err) {
    console.log(err);
  }
  res.render("one_product");
});

router.get("/prod-manage/:id/delete", async (req, res) => {
  try {
    const sneaker = await SneakerModel.findByIdAndDelete(req.params.id);
    res.redirect("/prod-manage");
  } catch (error) {
    console.log(error);
  }
});

router.get("/one-product/:id", async (req, res) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id, req.body);
    res.render("one_product", { sneaker });
  } catch (error) {
    console.log(error);
  }
});

router.get("/product-edit/:id/edit", async (req, res) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    res.render("product_edit.hbs", { sneaker });
  } catch (error) {
    console.log(error);
  }
});

router.post("/product-edit/:id/edit", async (req, res) => {
  try {
    const sneaker = await SneakerModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.redirect("/prod-manage");
  } catch (err) {
    console.log(err);
  }
});

router.get("/sneakers/:cat", async (req, res) => {
  try {
    const sneakers = await SneakerModel.find({ category: req.params.cat }); //*selecting each cat enum
    res.render("products", { sneakers: sneakers });
  } catch (err) {
    console.log(err);
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/createTag", async (req, res) => {
  try {
    const sneaker = await TagModel.create(req.body);
    res.redirect("/prod-add");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
