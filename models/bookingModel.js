const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userNameBooking: {
        type: String,
        required: [true, 'Please enter Your Name'],
        //unique: true,
    },
    startingDes: {
        type: String,
        required: [true, 'Please enter your starting destination'],
    },
    endingDes: {
        type: String,
        required: [true, 'Please enter ending destination'],
    },
    startDate: {
        type: String,
        required: [true, 'Please enter starting date'],
    },
    endDate: {
        type: String,
        required: [true, 'Please enter ending date'],
    },
    distance: {
        type: String,
        required: [true, 'Please count the distance'],
    },
    totalCost: {
        type: String,
        required: [true, 'Please count total cost'],
    },
    vehicleType: {
        type: String,
        required: [true, 'Please enter vehicle type'],
    },
    vehicleDetail: {
        type: String,
        required: [true, 'Please enter vehicle details'],
    },
    driverDetail: {
        type: String,
        required: [true, 'Please enter driver details'],
    },
    guideDetail: {
        type: String,
        required: [true, 'Please enter guide details'],
    },
    // token: { 
    //     type: String 
    // },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);