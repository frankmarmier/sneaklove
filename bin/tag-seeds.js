require("dotenv").config();
const Tag = require("../models/Tag");
const mongoose = require("mongoose");
const mongobdb = require("../config/mongo");

const exampleTags = [
    {
        label: "Sports"
    },
    {
        label: "Running"
    },
    {
        label: "Tennis"
    },
    {
        label: "Football"
    },
    {
        label: "Casual"
    }

];

Tag.create(exampleTags)
.then(dbRes => console.log(dbRes, "Tags added to db!"))
.catch(dbErr => console.log(dbErr));