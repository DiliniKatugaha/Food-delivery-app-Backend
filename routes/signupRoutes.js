const express = require('express');
const controller = require('../controllers/signupController');
const router = express.Router();

router.route('/RestaurantData').post(controller.signupResDetails)
router.route('/updateProfile').post(controller.updateResDetails)

module.exports= router;