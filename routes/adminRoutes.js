const express = require('express');

const router = express.Router();

const { createAdminUser, getAdminUsers, getAdminUser, deleteAdminUser, updateAdminUser, loginAdminUser} = require('../controllers/adminController');

//Get all 
router.get('/getUsers', getAdminUsers);

//Post a new
router.post('/create', createAdminUser);

//update a new
router.post('/login', loginAdminUser);

//Get a single
router.get('/:id', getAdminUser);

//Delete a new
router.delete('/:id', deleteAdminUser);

//update a new
router.patch('/:id', updateAdminUser);

module.exports = router;