const Booking = require('../models/bookingModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Create new User
const createBooking = async (req, res) => {
    
    try {
        console.log(req.body)
        //Get User Input
        const { userNameBooking, startingDes, endingDes, startDate, endDate, distance, totalCost, vehicleType, vehicleDetail, driverDetail, guideDetail } = req.body;
        console.log( userNameBooking+startingDes+endingDes+startDate+endDate+distance+totalCost+vehicleType+vehicleDetail+driverDetail+guideDetail)

        // Validate admin input
        if (!(userNameBooking && startingDes && endingDes && startDate && endDate && distance && totalCost && vehicleType && vehicleDetail && driverDetail && guideDetail)) {
            res.status(400).json({ message: "All input are required" });
            return
        }

        // Check if username already exists
        const booking = await Booking.create({ userNameBooking, startingDes, endingDes, startDate, endDate, distance, totalCost, vehicleType, vehicleDetail, driverDetail, guideDetail });
        res.status(200).json({ booking, message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating Booking' });
    }
};



//Get All Users
const getBookings = async (req, res) => {
    console.log("hellobookings")

    try {
        const booking = await Booking.find({}).sort({ createdAt: -1 });
        res.status(200).json({ booking });
    } catch (err) {
        res.status(400).json({ message: 'Error getting all users' });
    }
}

//Get Single User
const getBooking = async (req, res) => {

    try {
        const { id } = req.params; //destructuring
        const booking = await Booking.findById(id);
        res.status(200).json({ booking });
    } catch (err) {
        res.status(404).json({ message: 'Error, No such user' });
    }

}

//Delete User
const deleteBooking = async (req, res) => {

    try {
        const { id } = req.params;
        const booking = await Booking.findOneAndDelete({ _id: id });
        res.status(200).json({ booking });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Delete user Unsuccessful' });
    }

}

//Update User
const updateBooking = async (req, res) => {

    try {
        const { id } = req.params;
        const booking = await Booking.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json({ booking });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Update user Unsuccessful' });
    }

}

module.exports = {
    createBooking,
    getBookings,
    getBooking,
    deleteBooking,
    updateBooking,
}