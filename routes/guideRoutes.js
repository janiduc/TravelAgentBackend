const express = require('express');

const router = express.Router();

const { createGuide, getGuides, getGuide, deleteGuide, updateGuide, loginGuide} = require('../controllers/guideController');

//Get all 
router.get('/getUsers', getGuides);

//Post a new
router.post('/create', createGuide);

//update a new
router.post('/login', loginGuide);

//Get a single
router.get('/:id', getGuide);

//Delete a new
router.delete('/:id', deleteGuide);

//update a new
router.patch('/:id', updateGuide);

module.exports = router;