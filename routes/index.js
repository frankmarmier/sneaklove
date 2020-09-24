const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");

/*return console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`
);*/

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:id", async(req, res, next) => {
  try {
    const sneakers = await Sneaker.find();
    res.render("products", {sneakers});
  }
  catch(error) {
    next(error);
  }
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/signup", (req, res) => {
  res.send("signup");
});

router.get("/signin", (req, res) => {
  res.send("signin");
});


module.exports = router;
