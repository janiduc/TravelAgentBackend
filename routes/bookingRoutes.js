const express = require('express');

const router = express.Router();

const { createBooking, getBookings, getBooking, deleteBooking, updateBooking} = require('../controllers/bookingController');

//Get all 
router.get('/getUsers', getBookings);

//Post a new
router.post('/create', createBooking);

//login a new
//router.post('/login', loginDriver);

//Get a single
router.get('/:id', getBooking);

//Delete a new
router.delete('/:id', deleteBooking);

//update a new
router.patch('/:id', updateBooking);

module.exports = router;