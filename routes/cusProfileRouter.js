const express = require('express');
const router = express.Router();
const cusProfileController = require('../controllers/cusProfileController');
const { protect } = require('../middleware/authMiddleware');

// Get customer profile
router.get('/profile', protect, cusProfileController.getCustomerProfile);

// Update customer profile
router.put('/profile', protect, cusProfileController.updateCustomerProfile); // Changed to PUT

module.exports = router;
