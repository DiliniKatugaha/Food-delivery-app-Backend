const express = require('express');
const controller = require('../controllers/signupCusController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for token protection
const router = express.Router();

// POST route to sign up new customers
router.route('/CustomerData').post(controller.signupCusDetails);

// GET route to fetch customer profile data
router.route('/CustomerData').get(protect, controller.getCustomerData);

// PUT route to update customer profile data
router.route('/CustomerData').put(protect, controller.updateCustomerData);

module.exports = router;
