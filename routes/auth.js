const express = require("express");
const router = express.Router();
/*const User = require("../models/User");
const bcrypt = require("bcrypt");

const salt = 10;*/

router.get("/signin", async (req, res, next) => {
  res.render("signin");
});

router.get("/signup", async (req, res, next) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = req.body;

    const foundUser = await User.findOne({ email: newUser.email });

    if (foundUser) {
      res.render("auth/signup.hbs", { error: "Email already taken" });
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hashedPassword;
      const user = await User.create(newUser);
      res.redirect("/auth/signin");
    }
  } catch (error) {
    next(error);
  }
  //   res.render("auth/signup.hbs");
});


/*
router.post("/signin", async (req, res, next) => {
  // DO something
  //   res.render("auth/signin.hbs");
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  console.log(foundUser);
  if (!foundUser) {
    //   Display an error message telling the user that either the password
    // or the email is wrong
    //   res.redirect("/signup")
    req.flash("error", "Invalid credentials");
    res.redirect("/auth/signin");
    // res.render("auth/signin.hbs", { error: "Invalid credentials" });
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      // Display an error message telling the user that either the password
      // or the email is wrong
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
      // res.render("auth/signin.hbs", { error: "Invalid credentials" });
    } else {
      //
      // Authenticate the user...
      const userObject = foundUser.toObject();
      delete userObject.password; // remove password before saving user in session
      req.session.currentUser = userObject; // Stores the user in the session
      req.flash("success", "Successfully logged in...");
      res.redirect("/");
    }
  }
});



<<<<<<< HEAD
=======
    if (foundUser) {
      res.render("auth/signup.hbs", { error: "Email already taken" });
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hashedPassword;
      const user = await User.create(newUser);
      res.redirect("/auth/signin");
    }
  } catch (error) {
    next(error);
  }
});
>>>>>>> 2f27c2932876fa1de63ec5759c9d864c023240d5

router.get("/logout", async (req, res, next) => {
  console.log(req.session.currentUser);
  req.session.destroy(function (err) {
    res.redirect("/auth/signin");
  });
});
*/
module.exports = router;
