require('dotenv').config()

const express = require('express');

const bodyParser = require('body-parser');

const ConnectDB = require('./connectDB')

const router = express.Router();

const cors = require('cors')

const http = require('http');

const app = express();
console.log("Hello world")

const usersRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
ConnectDB()


app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRoute);
app.use('/admins', adminRoute);