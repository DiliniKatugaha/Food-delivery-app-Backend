const express = require('express');
const controller = require('../controllers/signupCusController');
const router = express.Router();

router.route('/CustomerData').post(controller.signupCusDetails)


module.exports= router;