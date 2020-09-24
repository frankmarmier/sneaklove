const express = require("express");
const router = new express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

const salt = 25;

router.post("/signup", async (req, res, next) => {
    try {
    
    const newUser = req.body;
    // console.log(newUser)

    const foundUser = await UserModel.find({email: newUser.email})

    if (foundUser) {
        res.render("signup.hbs", {error : "Email Already exist"})
    } else {
        const hashPassword = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hashPassword;
        const user = await UserModel.create(newUser);
        console.log(user);
        res.redirect("/signin");
    }
    } catch(err){
        next(err)
    };
    
});

router.post("/signin", async (req, res, next) => {
    const {email, password} = req.body
    const foundUser = await UserModel.findOne({ email: email})

})






module.exports = router;
