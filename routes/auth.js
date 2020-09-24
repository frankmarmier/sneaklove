const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const salt = 10;

router.get("/signin", (req, res, next) => {
  res.render("signin");
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });

  console.log(email, password);

  if (!foundUser) {
    res.redirect("/signup");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      res.render("signin", {error: "Invalid credentials"});
    } else {
      const userDocument = { ...foundUser };
      const userObject = foundUser.toObject();
      delete userObject.password; 
      req.session.currentUser = userObject; 
      res.redirect("/");
    }
  }
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = req.body;
    console.log(newUser);
    const foundUser = await User.findOne({ email: newUser.email });

    if (foundUser) {
      res.render("signup", { error: "This email already exists" });
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hashedPassword;
      await User.create(newUser);
      res.redirect("/signin");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/signin");
  });
});

module.exports = router;
