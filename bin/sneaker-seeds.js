require("dotenv").config();
const Sneaker = require("../models/Sneaker");
const mongoose = require("mongoose");
const mongobdb = require("../config/mongo");

const sneakersData = [
    {
        name: "Super Sneakers",
        ref: "15345",
        size: 40,
        description: "Stylish and Comfortable",
        price: 75.99,
        category: "women",
        id_tags: []
    
    },
    {
        name: "Nike Power",
        ref: "15894",
        size: 43,
        description: "Running Shoes",
        price: 89.99,
        category: "men",
        id_tags: []
    
    },
    {
        name: "Adidas Junior",
        ref: "15222",
        size: 28,
        description: "Running Shoes for kids",
        price: 49.99,
        category: "kids",
        id_tags: []
    
    }
];

Sneaker.create(sneakersData)
.then(dbRes => console.log(dbRes, "Sneakers added to db!"))
.catch(dbErr => console.log(dbErr));