const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");


  
  router.get("/sneakers/men", async(req, res, next) => {
    try {
      const sneakers = await Sneaker.find({category:"men"});
      res.render("products", {sneakers});

    
    }
    catch(error) {
      next(error);
    }
  });


  router.get("/sneakers/women", async(req, res, next) => {
    try {
      const sneakers = await Sneaker.find({category:"women"});
      res.render("products", {sneakers});
    }
    catch(error) {
      next(error);
    }
  });
  

  router.get("/sneakers/kids", async(req, res, next) => {
    try {
      const sneakers = await Sneaker.find({category:"kids"});
      res.render("products", {sneakers});
    }
    catch(error) {
      next(error);
    }
  });

router.get ("/prod-add", async (req, res, next)=>{
    res.render("products_add");
})

router.post ("/prod-add", async(req, res, next)=>{
    try{
        const newSneaker = await Sneaker.create(req.body);
        res.redirect("/sneakers/collection");
        
    }
    catch(error){
        next(error)
    }
});

module.exports = router;
