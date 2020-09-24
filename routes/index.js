const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:id", (req, res) => {
  res.render("one_product");
});

<<<<<<< HEAD
router.get("/one-product/:id", (req, res) => {
  // res.send("baz");
});
=======
// router.get("/one-product/:id", (req, res) => {
//   res.send("baz");
// });
>>>>>>> 3c9cb7f92ca15ad7e487f844bfbba14d30a95e36

router.get("/signup", (req, res) => {
  res.render("signup.hbs");
});

router.get("/signin", (req, res) => {
  res.render("signin.hbs");
});

module.exports = router;
