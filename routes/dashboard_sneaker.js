const express = require("express"); // import express in this module
const router = express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");
const uploader = require("../config/cloudinary");

router.get("/create", (req, res, next) => {
  res.render("products_add");
});

// C
router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
  try {
    const newSneaker = req.body;
    console.log(req);
    if (req.file) {
      newSneaker.image = req.file.path;
    };

    const x = await Sneaker.create(newSneaker);
    res.redirect("/dashboard/");
  } catch (error) {
    next(error); // Sends us to the error handler middleware in app.js if an error occurs
  }
  //
});

// R
router.get("/", async (req, res) => {
  res.render("products_manage", { sneakers: await Sneaker.find() });
});

// U
router.get("/product-edit/:id", async (req, res, next) => {
  res.render("product_edit", {
    sneaker: await Sneaker.findById(req.params.id),
  });
});

router.post("/edit/:id", async (req, res, next) => {
  const updatedSneaker = req.body;
  try {
    await Sneaker.findByIdAndUpdate(req.params.id, updatedSneaker);
    res.redirect("/dashboard");
  } catch (error) {
    next(error); // Sends us to the error handler middleware in app.js if an error occurs
  }
  //
});

// D
router.get("/product-delete/:id", async (req, res, next) => {
  try {
    console.log(req.params);
    await Sneaker.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
