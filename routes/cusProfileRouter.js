const express = require('express');
const router = express.Router();
const cusProfileController = require('../controllers/cusProfileController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, cusProfileController.getCustomerProfile);

router.put('/profile', protect, cusProfileController.updateCustomerProfile); 

module.exports = router;
