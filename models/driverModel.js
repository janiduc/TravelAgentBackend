const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    drivername: {
        type: String,
        required: [true, 'Please enter a drivername'],
        unique: true,
    },
    passwordD: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    nameD: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    addressD: {
        type: String,
        required: [true, 'Please enter a address'],
    },
    phoneD: {
        type: String,
        required: [true, 'Please enter a phone'],
    },
    genderD: {
        type: String,
        required: [true, 'Please enter the gender'],
    },
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);