require('dotenv').config()

const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connect to db');
    })
    .catch(
        err => {
            console.error(err)
            console.log('Error connecting to db')
            console.log(err)
        }
    );
};

module.exports = connectDB