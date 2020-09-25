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
  try {
    const sneakers = await SneakerModel.find();
    res.render("products_manage", { sneakers: sneakers });
  } catch (error) {
    console.log(error);
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

router.post("/prod-add", (req, res, next) => {
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

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/prod-manage/:id/delete", async (req, res) => {
  console.log(req.params.id)
  try {
    const sneaker = await SneakerModel.findByIdAndDelete(req.params.id);
    res.redirect("/prod-manage", { sneaker });
  } catch (error) {
    console.log(error);
  }
});

router.get("/one-product/:id", async (req, res) => {
  try {
    const sneaker = await SneakerModel.findById(req.params.id);
    res.render("one_product", { sneaker });
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
