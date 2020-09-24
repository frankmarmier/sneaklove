const express = require("express");
const router = express.Router();



router.get("/", (req, res) => {
  res.render("index.hbs");
});

// router.get("/sneakers/:cat", (req, res) => {
//   res.render("");
// });

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = router;
