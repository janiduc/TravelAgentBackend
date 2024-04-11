const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminnameA: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    nameA: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    passwordA: {
        type: String,
        required: [true, 'Please enter a name'],
    }
    // token: { 
    //     type: String 
    // },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);