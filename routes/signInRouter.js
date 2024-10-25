const express = require('express');
const controller = require('../controllers/signInController');
const controller2 = require('../controllers/profileController');

const router = express.Router();

router.route('/signin/signinDetails').post(controller.signinDetails);
router.route('/customerData').get(controller2.getCustomerData);
router.route('/customerData').put(controller2.updateCustomerData);



module.exports= router;
