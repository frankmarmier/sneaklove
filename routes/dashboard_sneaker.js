const express = require("express"); // import express in this module
const router = express.Router(); // create an app sub-module (router)
const Sneaker = require('../models/Sneaker');

router.get('/', (req, res, next) => {
    res.render('products_manage');
});

router.get('/create', (req, res, next) => {
    res.render('products_add');
});

router.post('/prod-add', async (req, res, next) => {
    try {
        const newprod = await Sneaker.create(req.body);
        console.log(newprod);
        res.redirect('/dashboard/create');
    } catch(err) {next(err)}
});


module.exports = router;
