require('dotenv').config()

const express = require('express');

const bodyParser = require('body-parser');

const ConnectDB = require('./connectDB')

const router = express.Router();

const cors = require('cors');

const http = require('http');

const app = express();
console.log("Hello world")

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

const usersRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const driverRoute = require('./routes/driverRoutes');
const guideRoute = require('./routes/guideRoutes');
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
app.use('/drivers', driverRoute);
app.use('/guides', guideRoute);