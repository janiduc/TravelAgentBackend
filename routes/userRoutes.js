const express = require('express');

const router = express.Router();

const { createUser, getUsers, getUser, deleteUser, updateUser, loginUser} = require('../controllers/userController');

//Get all 
router.get('/getUsers', getUsers);

//Post a new
router.post('/create', createUser);

//update a new
router.post('/login', loginUser);

//Get a single
router.get('/:id', getUser);

//Delete a new
router.delete('/:id', deleteUser);

//update a new
router.patch('/:id', updateUser);

module.exports = router;