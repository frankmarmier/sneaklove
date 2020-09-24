const express = require("express");
const router = new express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const { find } = require("../models/User");

const salt = 10;



router.post("/signup", async (req, res, next) => {
    try {
    
    const newUser = req.body;
    console.log(">>>newUser>>>", newUser)

    const foundUser = await UserModel.findOne({email: newUser.email})
        console.log(">>>foundUser>>>",foundUser)
    if (foundUser) {
        res.render("signup.hbs")
        console.log("toto")
    } else {
        const hashPassword = bcrypt.hashSync(newUser.password, salt);
        console.log(hashPassword)
        console.log("toto1")
        newUser.password = hashPassword;

        // console.log("toto2")

        const user = await UserModel.create(newUser);
        // console.log("toto3")

        console.log(user);
        // console.log("toto4")

        res.redirect("/signin");
    }
    } catch(err){
        next(err)
    };
    
});


router.post("/signin", async (req, res, next) => {
    const {email, password} = req.body;
    const findUser = await UserModel.findOne({email: email});
    // console.log(findUser)

    if (!findUser) {
        req.flash("error", "Invalid Credential")
        res.redirect("/signin")
    } else {
        const isSamePassword = bcrypt;bcrypt.compareSync(password, findUser.password)
        if (!isSamePassword) {
            req.flash("error", "invalid credentials");
            res.redirect("/signin")
        } else {
            const userDocument = {...findUser}
            const userObject = findUser.toObject();
        }
    }
})



module.exports = router;
