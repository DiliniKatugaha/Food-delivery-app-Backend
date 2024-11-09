const express = require('express');
const router = express.Router();
const resProfileController = require('../controllers/resProfileController');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });

router.get('/profile', protect, resProfileController.getRestaurantProfile);

router.post('/updateProfile', protect, upload.single('logo'), resProfileController.updateRestaurantProfile);

module.exports = router;
