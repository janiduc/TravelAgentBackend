const express = require('express');

const router = express.Router();

const { createDriver, getDrivers, getDriver, deleteDriver, updateDriver, loginDriver} = require('../controllers/driverController');

//Get all 
router.get('/getUsers', getDrivers);

//Post a new
router.post('/create', createDriver);

//update a new
router.post('/login', loginDriver);

//Get a single
router.get('/:id', getDriver);

//Delete a new
router.delete('/:id', deleteDriver);

//update a new
router.patch('/:id', updateDriver);

module.exports = router;