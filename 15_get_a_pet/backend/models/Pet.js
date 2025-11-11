const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Pet = mongoose.model('Pet', new Schema({
    name: {
        type: String,
        required: true,         
    },
    age: {
        type: String,
        required: true, 
    },
    weight: {
        type: String,
        required: true,
    },
    color: {
        type: String,   
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
        default: true,
    },
    user:Object, 
    adopter:Object,
    }, 
    { timestamps: true },
    ),
) 

module.exports = User;