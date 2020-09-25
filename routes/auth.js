const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const salt = 10;



// signup

router.get("/signup", (req, res) => {
    res.render("signup");
  });

  router.post("/signup", async (req, res, next) => {
    try {
      const newUser = req.body;
  
      const foundUser = await User.findOne({ email: newUser.email });
  
      if (foundUser) {
        res.render("signup", { error: "Email already taken" });
      } else {
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hashedPassword;
        const user = await User.create(newUser);
        res.redirect("/sneakers/collection");
      }
    } catch (error) {
      next(error);
    }
   
  });
  

  // signin

  router.get("/signin", (req, res) => {
    res.render("signin");
  });
  
  
  router.post("/signin", async (req, res, next) => {
   
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
   
   
    if (!foundUser) {
     
      req.flash("error", "Invalid credentials");
    //   res.redirect("/signin");
      res.render("signin", { error: "Invalid credentials" });
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        // Display an error message telling the user that either the password
        // or the email is wrong
        req.flash("error", "Invalid credentials");
        // res.redirect("/signin");
        res.render("signin", { error: "Invalid credentials" });
      } else {
        //
        // Authenticate the user...
        const userDocument = { ...foundUser };
        console.log(userDocument);
        const userObject = foundUser.toObject();
        delete userObject.password; // remove password before saving user in session
        // console.log(req.session, "before defining current user");
        req.session.currentUser = userObject; // Stores the user in the session
        // console.log(req.session, "AFTER defining current user");
        // req.flash("success", "Successfully logged in...");
        const isLoggedIn = true;
       
       
        res.render("index", {isLoggedIn});
        
      }
    }
  });

  router.get("/logout", (req, res, next) => {
    req.session.destroy( function(error) {
      res.redirect("/signin");
    });
   
  })
  


  
  
  
  
  module.exports = router;