const express = require("express");
const SneakerModel = require("../models/Sneaker");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.render("index");
});

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.get("/prod-manage", async (req, res) => {
  console.log("totooooooooooo")
  try {
    const sneakers = await SneakerModel.find();
    res.render("products_manage", { sneakers: sneakers });
  } catch (err) {
    console.log(err);
  }
});

router.post("/prod-add", (req, res, next) => {
  console.log(req.body);
  SneakerModel.create(req.body)
    .then((dbRes) => {
      res.redirect("/sneakers/collection");
    })
    .catch((dbErr) => {
      next(err);
    });
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

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = router;
