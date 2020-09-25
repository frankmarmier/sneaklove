const express = require("express");
const router = new express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const exposeFlashMessage = require("../middlewares/exposeFlashMessage");

const salt = 10;



router.post("/signup", exposeFlashMessage, async(req, res, next) => {
    try {
    
    const newUser = req.body;
    console.log(">>>newUser>>>", newUser)

    const foundUser = await UserModel.findOne({email: newUser.email})
        console.log(">>>foundUser>>>",foundUser)
    if (foundUser) {
        console.log("titi");
        req.flash("error", "email already exists")
        res.redirect("/signup")
    } else {
        const hashPassword = bcrypt.hashSync(newUser.password, salt);
        console.log(hashPassword)
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
            const userDocument = {...findUser};
            const userObject = findUser.toObject();
            delete userObject.password;

            req.session.currentUser = userObject;
            req.flash("success", "You logged in !")
            res.redirect("/")
        };
    };
});

router.get("/logout", (req, res, next) => {
    // console.log(req.session.currentUser)
    req.session.destroy(function(err){
        res.redirect("/signin")
    })
})



module.exports = router;
