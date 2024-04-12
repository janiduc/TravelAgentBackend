const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
    guidename: {
        type: String,
        required: [true, 'Please enter a guidename'],
        unique: true,
    },
    passwordG: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    nameG: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    addressG: {
        type: String,
        required: [true, 'Please enter a address'],
    },
    phoneG: {
        type: String,
        required: [true, 'Please enter a phone'],
    },
    genderG: {
        type: String,
        required: [true, 'Please enter the gender'],
    },
    // token: { 
    //     type: String 
    // },
}, { timestamps: true });

module.exports = mongoose.model('Guide', guideSchema);