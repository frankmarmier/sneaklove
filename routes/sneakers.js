const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");

router.get("/collection", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find();
    const tags = await Tag.find();
    const category = "whole";
    res.render("products", {
      sneakers,
      category,
      tags,
      js: ["client"],
    });
  } catch (err) {
    next(err);
  }
});

router.get("/tag-filter/", async (req, res, next) => {
  const tagIDs = req.query.tag;
  const sneakers = await Sneaker.find({ id_tags: tagIDs });
  if (sneakers.length === 0) {
    const allSneakers = await Sneaker.find();
    res.json(allSneakers);
  } else {
    res.json(sneakers);
  }
});

router.get("/:cat", async (req, res, next) => {
  console.log(req.params);
  try {
    const sneakers = await Sneaker.find({ category: req.params.cat });
    const tags = await Tag.find();
    res.render("products", {
      sneakers,
      tags,
      js: ["client"],
    });
  } catch (err) {
    next(err);
  }
});



module.exports = router;
