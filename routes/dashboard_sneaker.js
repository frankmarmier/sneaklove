const express = require("express"); // import express in this module
const router = express.Router(); // create an app sub-module (router)
const Sneaker = require('../models/Sneaker');
const uploader = require("../config/cloudinary");

router.get('/', (req, res, next) => {
    res.render('products_manage');
});

router.get('/create', (req, res, next) => {
    res.render('products_add');
});

// C
router.post(
    '/prod-add',
    uploader.single("image"), // Middleware function that allows you to read and upload to cloudinary
    // The uploaded file can be found at req.file
    async (req, res, next) => {
      // DO something
  
      const newSneaker = req.body;
      
      if (req.file) {
        newSneaker.image = req.file.path;
      }
      
      try {
        await Sneaker.create(newSneaker);
        res.redirect('/dashboard/create');
      } catch (error) {
        next(error); // Sends us to the error handler middleware in app.js if an error occurs
      }
      //
    }
  );


module.exports = router;
