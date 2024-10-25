const express = require('express');
const { createMenu, getMenu, updateMenu,getMenuById } = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware'); // Import your auth middleware
const router = express.Router();

// Route to create a new menu
router.route('/menu').post(protect, createMenu); // Apply the protect middleware here

// Route to get menu by restaurant ID
router.route('/menu').get(protect, getMenu); // Also apply to getMenu if it needs authentication
router.route('/menu/:restaurantId').get(protect, getMenuById);

router.route('/menu/:id').put(protect, updateMenu);

module.exports = router;
