const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const Sneaker = require("../models/Sneaker");

router.get("/create", (req, res, next) => {
  res.render("products_add");
});

module.exports = router;
