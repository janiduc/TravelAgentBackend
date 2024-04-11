const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    address: {
        type: String,
        required: [true, 'Please enter a address'],
    },
    phone: {
        type: String,
        required: [true, 'Please enter a phone'],
    },
    gender: {
        type: String,
        required: [true, 'Please enter a gender'],
    },
    // token: { 
    //     type: String 
    // },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);