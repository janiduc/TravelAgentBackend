const express = require('express');

const router = express.Router();

const { createVehicle, getVehicles, getVehicle, deleteVehicle, updateVehicle, loginVehicle} = require('../controllers/vehicleController');

//Get all 
router.get('/getUsers', getVehicles);

//Post a new
router.post('/create', createVehicle);

//update a new
router.post('/login', loginVehicle);

//Get a single
router.get('/:id', getVehicle);

//Delete a new
router.delete('/:id', deleteVehicle);

//update a new
router.patch('/:id', updateVehicle);

module.exports = router;