const express = require("express");
const router = new express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

const salt = 25;

router.post("/signup", async (req, res, next) => {
    try {
    
    const newUser = req.body;

    const foundUser = await UserModel.find({email: newUser.email})

    if (foundUser) {
        res.render("signup.hbs", {error : "Invalid credentials"})
    } else {
        const hashPassword = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hashPassword;
        const user = await UserModel.create(newUser)
    }

    } catch(err){
        next(err)
    }
})




module.exports = router;
