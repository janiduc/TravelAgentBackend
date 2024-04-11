const Admin = require('../models/adminModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Create new User
const createAdminUser = async (req, res) => {
    console.log("helloooo")
    try {
        console.log("hellooo1111o")
        console.log(req.body)
        //Get User Input
        const { adminname,nameA, passwordA } = req.body;
        //console.log("helloooo22222")
        console.log( adminname+nameA+passwordA)

        // Validate user input
        if (!(adminname && passwordA && nameA)) {
            //console.log("helloooo333333333333333")
            res.status(400).json({ message: "All input are required" });
            return
        }
        //console.log("helloooo444444444")

        // Check if username already exists
        const existingUser = await User.findOne({ adminname });
        //console.log("helloooo55555555555555")
        if (existingUser) {
            //console.log("helloooo666666666666")
            return res.status(409).json({ message: 'Username already exists. Please Login' });
        }

        //console.log("helloooo7777777777777")
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(passwordA, 10);
        console.log(hashedPassword)
        const user = await User.create({ adminname, passwordA: hashedPassword, nameA });
        //console.log("helloooo9999999999999")
        res.status(200).json({ user, message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating user' });
    }
};



//Get All Users
const getAdminUsers = async (req, res) => {
    console.log("helloadmins")

    try {
        const admin = await Admin.find({}).sort({ createdAt: -1 });
        res.status(200).json({ admin });
    } catch (err) {
        res.status(400).json({ message: 'Error getting all users' });
    }
}

//Get Single User
const getAdminUser = async (req, res) => {

    try {
        const { id } = req.params; //destructuring
        const user = await User.findById(id);
        res.status(200).json({ user });
    } catch (err) {
        res.status(404).json({ message: 'Error, No such user' });
    }

}

//Delete User
const deleteAdminUser = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findOneAndDelete({ _id: id });
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Delete user Unsuccessful' });
    }

}

//Update User
const updateAdminUser = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Update user Unsuccessful' });
    }

}

//Login User
const loginAdminUser = async (req, res) => {

    try {
        //Get User Input
        const { adminname, passwordA } = req.body;

        // Validate user input
        if (!(adminname && passwordA)) {
            res.status(400).json({ message: "All input are required" });
            return
        }

        // Check if username already exists
        const user = await User.findOne({ adminname });
        if (!user) {
            return res.status(409).json({ message: 'Username does not exists. Please create an Account' });
        }

        if (user && (await bcrypt.compare(passwordA, user.passwordA))) {
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
            return res.status(200).json({user, message: 'Admin Login successfully' });
        }
        return res.status(400).json("Invalid Credentials");

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Error Admin Login' });
    }
};

module.exports = {
    createAdminUser,
    getAdminUsers,
    getAdminUser,
    deleteAdminUser,
    updateAdminUser,
    loginAdminUser,
}