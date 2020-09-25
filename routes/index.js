const express = require("express");
const router = express.Router();
const TagModel = require("../models/Tag");
const Sneaker = require("../models/Sneaker");
const fileUploader = require("../config/cloudinary");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup.hbs");
});

router.get("/signin", (req, res) => {
  res.render("signin.hbs");
});

router.get("/prod-add", async (req, res, next) => {
  try {
    const dbResult = await TagModel.find();
    res.render("products_add", { tags: dbResult });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/prod-add",
  fileUploader.single("image"),
  async (req, res, next) => {
    const newSneaker = req.body;
    if (req.file) {
      newSneaker.image = req.file.path;
    }
    try {
      const dbResult = await Sneaker.create(newSneaker);
      res.redirect("/prod-manage");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/prod-manage", (req, res) => {
  res.render("products_manage");
});

module.exports = router;
