const Vehicle = require('../models/vehicleModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Create new User
const createVehicle = async (req, res) => {
    try {
        console.log(req.body)
        //Get User Input
        const { vehicleID, passwordV, vehicleType, nameV } = req.body;
        console.log( vehicleID+passwordV+vehicleType+nameV)

        // Validate admin input
        if (!(vehicleID && passwordV && vehicleType && nameV)) {
            res.status(400).json({ message: "All input are required" });
            return
        }

        // Check if username already exists
        const existingVehicle = await Vehicle.findOne({ vehicleID });
        if (existingVehicle) {
            return res.status(409).json({ message: 'Username already exists. Please Login' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(passwordV, 10);
        console.log(hashedPassword)
        const vehicle = await Vehicle.create({ vehicleID, passwordV: hashedPassword, vehicleType, nameV });
        res.status(200).json({ vehicle, message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating user' });
    }
};



//Get All Users
const getVehicles = async (req, res) => {
    console.log("hellodrivers")

    try {
        const vehicle = await Vehicle.find({}).sort({ createdAt: -1 });
        res.status(200).json({ vehicle });
    } catch (err) {
        res.status(400).json({ message: 'Error getting all users' });
    }
}

//Get Single User
const getVehicle = async (req, res) => {

    try {
        const { id } = req.params; //destructuring
        const vehicle = await Vehicle.findById(id);
        res.status(200).json({ vehicle });
    } catch (err) {
        res.status(404).json({ message: 'Error, No such user' });
    }

}

//Delete User
const deleteVehicle = async (req, res) => {

    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findOneAndDelete({ _id: id });
        res.status(200).json({ vehicle });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Delete user Unsuccessful' });
    }

}

//Update User
const updateVehicle = async (req, res) => {

    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json({ vehicle });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Update user Unsuccessful' });
    }

}

//Login User
const loginVehicle = async (req, res) => {

    try {
        //Get User Input
        const { vehicleID, passwordV } = req.body;

        // Validate user input
        if (!(vehicleID && passwordV)) {
            res.status(400).json({ message: "All input are required" });
            return
        }

        // Check if username already exists
        const vehicle = await Vehicle.findOne({ vehicleID });
        if (!vehicle) {
            return res.status(409).json({ message: 'Username does not exists. Please create an Account' });
        }

        if (vehicle && (await bcrypt.compare(passwordV, vehicle.passwordV))) {
            // user
            return res.status(200).json({vehicle, message: 'Admin Login successfully' });
        }
        return res.status(400).json("Invalid Credentials");

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Error Admin Login' });
    }
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicle,
    deleteVehicle,
    updateVehicle,
    loginVehicle,
}