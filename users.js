const mongoose = require('mongoose');


// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    post:{
         type: mongoose.Schema.Types.ObjectId, ref: 'posts'
    }
    
});


// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;