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
        const { adminnameA, nameA, passwordA } = req.body;
        //console.log("helloooo22222")
        console.log( adminnameA+nameA+passwordA)

        // Validate admin input
        if (!(adminnameA && passwordA && nameA)) {
            console.log("helloooo333333333333333")
            res.status(400).json({ message: "All input are required" });
            return
        }
        console.log("helloooo444444444")

        // Check if username already exists
        const existingAdmin = await Admin.findOne({ adminnameA });
        console.log("helloooo55555555555555")
        if (existingAdmin) {
            console.log("helloooo666666666666")
            return res.status(409).json({ message: 'Username already exists. Please Login' });
        }

        console.log("helloooo7777777777777")
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(passwordA, 10);
        console.log(hashedPassword)
        const admin = await Admin.create({ adminnameA, nameA, passwordA: hashedPassword });
        console.log("helloooo9999999999999")
        res.status(200).json({ admin, message: 'User created successfully' });
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
        const admin = await Admin.findById(id);
        res.status(200).json({ admin });
    } catch (err) {
        res.status(404).json({ message: 'Error, No such user' });
    }

}

//Delete User
const deleteAdminUser = async (req, res) => {

    try {
        const { id } = req.params;
        const admin = await Admin.findOneAndDelete({ _id: id });
        res.status(200).json({ admin });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Delete user Unsuccessful' });
    }

}

//Update User
const updateAdminUser = async (req, res) => {

    try {
        const { id } = req.params;
        const admin = await Admin.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json({ admin });
    } catch (err) {
        res.status(400).json({ message: 'Error, No such user, Update user Unsuccessful' });
    }

}

//Login User
const loginAdminUser = async (req, res) => {

    try {
        //Get User Input
        const { adminnameA, passwordA } = req.body;

        // Validate user input
        if (!(adminnameA && passwordA)) {
            res.status(400).json({ message: "All input are required" });
            return
        }

        // Check if username already exists
        const admin = await Admin.findOne({ adminnameA });
        if (!admin) {
            return res.status(409).json({ message: 'Username does not exists. Please create an Account' });
        }

        if (admin && (await bcrypt.compare(passwordA, admin.passwordA))) {
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
            return res.status(200).json({admin, message: 'Admin Login successfully' });
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