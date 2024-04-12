const Guide = require('../models/guideModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Create new User
const createGuide = async (req, res) => {
    console.log("helloooo")
    try {
        console.log("hellooo1111o")
        console.log(req.body)
        //Get User Input
        const { guidename, passwordG, nameG, addressG, phoneG, genderG } = req.body;
        //console.log("helloooo22222")
        console.log( guidename+passwordG+nameG+addressG+phoneG+genderG)

        // Validate admin input
        if (!(guidename && passwordG && nameG && addressG && phoneG && genderG)) {
            //console.log("helloooo333333333333333")
            res.status(400).json({ message: "All input are required" });
            return
        }
        //console.log("helloooo444444444")

        // Check if username already exists
        const existingGuide = await Guide.findOne({ guidename });
        //console.log("helloooo55555555555555")
        if (existingGuide) {
            //console.log("helloooo666666666666")
            return res.status(409).json({ message: 'Username already exists. Please Login' });
        }

        //console.log("helloooo7777777777777")
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(passwordG, 10);
        console.log(hashedPassword)
        const guide = await Guide.create({ guidename, passwordG: hashedPassword, nameG, addressG, phoneG, genderG });
        //console.log("helloooo9999999999999")
        res.status(200).json({ guide, message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating user' });
    }
};



//Get All Users
const getGuides = async (req, res) => {
    console.log("helloguides")

    try {
        const guide = await Guide.find({}).sort({ createdAt: -1 });
        res.status(200).json({ guide });
    } catch (err) {
        res.status(400).json({ message: 'Error getting all users' });
    }
}

//Get Single User
const getGuide = async (req, res) => {

    try {
        const { id } = req.params; //destructuring
        const guide = await Guide.findById(id);
        res.status(200).json({ guide });
    } catch (err) {
        res.status(404).json({ message: 'Error, No such user' });
    }

}

//Delete User
const deleteGuide = async (req, res) => {

    try {
        const { id } = req.params;
        const guide = await Guide.findOneAndDelete({ _id: id });
        res.status(200).json({ guide });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Delete user Unsuccessful' });
    }

}

//Update User
const updateGuide = async (req, res) => {

    try {
        const { id } = req.params;
        const guide = await Guide.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json({ guide });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Update user Unsuccessful' });
    }

}

//Login User
const loginGuide = async (req, res) => {

    try {
        //Get User Input
        const { guidename, passwordG } = req.body;

        // Validate user input
        if (!(guidename && passwordG)) {
            res.status(400).json({ message: "All input are required" });
            return
        }

        // Check if username already exists
        const guide = await Guide.findOne({ drivername });
        if (!guide) {
            return res.status(409).json({ message: 'Username does not exists. Please create an Account' });
        }

        if (guide && (await bcrypt.compare(passwordG, guide.passwordG))) {
            // // Create token
            // const accessToken = jwt.sign(
            //     { user_id: user._id, username },
            //     process.env.TOKEN_KEY,
            //     {
            //         expiresIn: "1h",
            //     }
            // );

            // const refreshToken = jwt.sign(
            //     { user_id: user._id, username },
            //     process.env.TOKEN_KEY,
            //     {
            //         expiresIn: "1d",
            //     }
            // );

            // res
            // .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None',secure:true })
            // .setHeader('Access-Control-Expose-Headers', 'Authorization')
            // .header('Authorization', accessToken)


            // user
            return res.status(200).json({guide, message: 'Admin Login successfully' });
        }
        return res.status(400).json("Invalid Credentials");

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Error Admin Login' });
    }
};

module.exports = {
    createGuide,
    getGuides,
    getGuide,
    deleteGuide,
    updateGuide,
    loginGuide,
}