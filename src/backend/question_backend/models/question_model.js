const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionId: {
        type: Number,
        required: true
    },

    title: { 
        type: String, 
        required: true 
    },

    description: {  
        type: String, 
        required: true 
    },

    category: { 
        type: String,
        required: true
    },
  
    difficulty: {
        type: String,
        required: true 
    },

});

const questionModel = mongoose.model('Questions', questionSchema);  
module.exports = questionModel;