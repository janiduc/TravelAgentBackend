const Driver = require('../models/driverModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Create new User
const createDriver = async (req, res) => {
    try {
        console.log(req.body)
        //Get User Input
        const { drivername, passwordD, nameD, addressD, phoneD, genderD } = req.body;
        console.log( drivername+passwordD+nameD+addressD+phoneD+genderD)

        // Validate admin input
        if (!(drivername && passwordD && nameD && addressD && phoneD && genderD)) {
            res.status(400).json({ message: "All input are required" });
            return
        }

        // Check if username already exists
        const existingDriver = await Driver.findOne({ drivername });
        if (existingDriver) {
            return res.status(409).json({ message: 'Username already exists. Please Login' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(passwordD, 10);
        console.log(hashedPassword)
        const driver = await Driver.create({ drivername, passwordD: hashedPassword, nameD, addressD, phoneD, genderD });
        res.status(200).json({ driver, message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating user' });
    }
};



//Get All Users
const getDrivers = async (req, res) => {
    console.log("hellodrivers")

    try {
        const driver = await Driver.find({}).sort({ createdAt: -1 });
        res.status(200).json({ driver });
    } catch (err) {
        res.status(400).json({ message: 'Error getting all users' });
    }
}

//Get Single User
const getDriver = async (req, res) => {

    try {
        const { id } = req.params; //destructuring
        const driver = await Driver.findById(id);
        res.status(200).json({ driver });
    } catch (err) {
        res.status(404).json({ message: 'Error, No such user' });
    }

}

//Delete User
const deleteDriver = async (req, res) => {

    try {
        const { id } = req.params;
        const driver = await Driver.findOneAndDelete({ _id: id });
        res.status(200).json({ driver });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Delete user Unsuccessful' });
    }

}

//Update User
const updateDriver = async (req, res) => {

    try {
        const { id } = req.params;
        const driver = await Driver.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json({ driver });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Update user Unsuccessful' });
    }

}

//Login User
const loginDriver = async (req, res) => {

    try {
        //Get User Input
        const { drivername, passwordD } = req.body;

        // Validate user input
        if (!(drivername && passwordD)) {
            res.status(400).json({ message: "All input are required" });
            return
        }

        // Check if username already exists
        const driver = await Driver.findOne({ drivername });
        if (!driver) {
            return res.status(409).json({ message: 'Username does not exists. Please create an Account' });
        }

        if (driver && (await bcrypt.compare(passwordD, driver.passwordD))) {
            // user
            return res.status(200).json({driver, message: 'Admin Login successfully' });
        }
        return res.status(400).json("Invalid Credentials");

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Error Admin Login' });
    }
};

module.exports = {
    createDriver,
    getDrivers,
    getDriver,
    deleteDriver,
    updateDriver,
    loginDriver,
}