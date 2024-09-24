const express = require('express');
const controller = require('../controllers/signupController');
const router = express.Router();

router.route('/RestaurantData').post(controller.signupResDetails)
// router.route('/CustomerData').post(controller.customerDetails)
// router.route('/signindata').post(controller.signinDetails)


module.exports= router;