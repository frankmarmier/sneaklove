
    

    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;
    
    const sneakerSchema = new Schema({
        name: String,
        ref: String,
        size: Number,
        description: String,
        price: Number,
        category: String [men, women, kids],
        id_tags: [ObjectId]
    
    });
    const Sneaker = mongoose.model("Sneaker", sneakerSchema);
    
    
    module.exports = Sneaker;
        
       