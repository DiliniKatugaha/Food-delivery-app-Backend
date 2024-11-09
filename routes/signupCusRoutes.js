const express = require('express');
const controller = require('../controllers/signupCusController');
const { protect } = require('../middleware/authMiddleware'); 
const router = express.Router();

router.route('/CustomerData').post(controller.signupCusDetails);

router.route('/CustomerData').get(protect, controller.getCustomerData);

router.route('/CustomerData').put(protect, controller.updateCustomerData);

module.exports = router;
