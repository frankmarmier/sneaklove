const express = require("express");
const router = new express.Router();
const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");

router.get("/", (req, res) => {
  res.render("index.hbs");
});

router.get("/ajax", async (req, res, next) => {
  const dashShoes = await Sneaker.find();
  res.json({ sneakers: dashShoes });
});

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const dashShoes = await Sneaker.find();
    const tagDocuments = await Tag.find();
    res.render("products", {
      sneakers: dashShoes,
      tags: tagDocuments,
      scripts: ["client"],
    });
  } catch (error) {
    next(error);
  }
});

router.get("/sneakers/men", async (req, res, next) => {
  try {
    const dashShoes = await Sneaker.find();
    const tagDocuments = await Tag.find();
    let filterDashShoes = dashShoes.filter(function (shoe) {
      return shoe.category === "men";
    });

    res.render("products", { sneakers: filterDashShoes, tags: tagDocuments });
  } catch (error) {
    next(error);
  }
});

router.get("/sneakers/women", async (req, res, next) => {
  try {
    const dashShoes = await Sneaker.find();
    const tagDocuments = await Tag.find();
    let filterDashShoes = dashShoes.filter(function (shoe) {
      return shoe.category === "women";
    });

    res.render("products", { sneakers: filterDashShoes, tags: tagDocuments });
  } catch (error) {
    next(error);
  }
});

router.get("/sneakers/kids", async (req, res, next) => {
  try {
    const dashShoes = await Sneaker.find();
    const tagDocuments = await Tag.find();
    let filterDashShoes = dashShoes.filter(function (shoe) {
      return shoe.category === "kids";
    });

    res.render("products", { sneakers: filterDashShoes, tags: tagDocuments });
  } catch (error) {
    next(error);
  }
});

router.get("/one-product/:id", async (req, res, next) => {
  try {
    const sneakerId = req.params.id;
    const dashShoes = await Sneaker.findById(sneakerId);
    console.log(dashShoes);
    res.render("one_product", { sneaker: dashShoes });
  } catch (error) {
    next(error);
  }
});

// router.get("/signup", (req, res) => {
//   res.send("sneak");
// });

// router.get("/signin", (req, res) => {
//   res.send("love");
// });

module.exports = router;
