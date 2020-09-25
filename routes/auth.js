const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const salt = 10;

router.get("/signin", async (req, res, next) => {
  res.render("signin");
});

router.get("/signup", async (req, res, next) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = req.body;
    console.log('1st', req.body)
    const foundUser = await User.findOne({ email: newUser.email });
    console.log('2nd', foundUser)
    if (foundUser) {
      req.flash("error", "Email already taken");
      res.render("signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hashedPassword;
      const user = await User.create(newUser);
      console.log('3rd', user)
      res.redirect("/auth/signin");
    }
  } catch (error) {
    next(error);
  }
});



router.post("/signin", async (req, res, next) => {

  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  console.log(foundUser);
  if (!foundUser) {
    req.flash("error", "Invalid credentials");
    res.redirect("/auth/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
    } else {
      const userObject = foundUser.toObject();
      delete userObject.password; 
      req.session.currentUser = userObject; 
      req.flash("success", "Successfully logged in...");
      res.redirect("/sneakers/collection");
    }
  }
});

router.get("/logout", async (req, res, next) => {
  console.log(req.session.currentUser);
  req.session.destroy(function (err) {
    res.redirect("/auth/signin");
  });
});

module.exports = router;
