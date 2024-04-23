const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleID: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    passwordV: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    vehicleType: {
        type: String,
        required: [true, 'Please enter a vehicleType'],
    },
    nameV: {
        type: String,
        required: [true, 'Please enter a name'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);