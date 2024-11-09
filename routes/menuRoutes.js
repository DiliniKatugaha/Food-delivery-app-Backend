const express = require('express');
const { createMenu, getMenu, updateMenu,getMenuById, getMenuItemsByRestaurantId} = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/menu').post(protect, createMenu); 
router.route('/menu').get(protect, getMenu); 
router.route('/menu/:restaurantId').get(protect, getMenuById);
router.route('/menu/:id').put(protect, updateMenu);
router.get('/menus/:id', getMenuItemsByRestaurantId);

module.exports = router;
