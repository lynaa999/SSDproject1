const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true },
    content: {
         type: String, 
         required: true },
         author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },

    // Add other fields as needed (e.g., author, date, etc.)
  });
  
 // collection part
const collection1 = new mongoose.model("posts", postSchema);

module.exports = collection1;