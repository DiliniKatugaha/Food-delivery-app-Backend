const Menu = require('../models/menuModel');
const Category = require('../models/categoryModel');

// Create a new menu item
exports.createMenu = async (req, res) => {
    const restaurantId = req.user.restaurantId; // Ensure req.user is set correctly
    console.log('Request user:', req.user); // Log the user info
    console.log('Request body:', req.body); // Log the request body

    if (!restaurantId) {
        return res.status(400).json({ message: 'Restaurant ID is required' });
    }

    try {
        const menuData = {
            name: req.body.name,
            image: req.body.image, // Handle image upload appropriately
            details: req.body.details,
            deliveryFee: req.body.deliveryFee,
            restaurantId: restaurantId // Set the restaurant ID
        };

        // Validation checks
        if (!menuData.name || !menuData.details || !menuData.deliveryFee) {
            return res.status(400).json({ message: 'Name, details, and delivery fee are required' });
        }

        // Create the menu in the database
        const newMenu = await Menu.create(menuData);

        // Handle categories creation if provided
        const categories = req.body.categories || [];
        const categoryPromises = categories.map(category => {
            return Category.create({
                name: category.name,
                price: category.price,
                menuId: newMenu.id // Assuming there's a menuId foreign key in your Category model
            });
        });

        await Promise.all(categoryPromises); // Wait for all categories to be created

        // Return a success response
        res.status(201).json({
            message: 'Menu created successfully',
            menu: newMenu,
            categories: categories
        });
    } catch (error) {
        console.error('Error creating menu:', error);
        res.status(400).json({ message: 'Error creating menu', error: error.message });
    }
};

// Retrieve all menus for the restaurant
exports.getMenu = async (req, res) => {
    const restaurantId = req.user.restaurantId;

    try {
        const menus = await Menu.findAll({
            where: { restaurantId },
            include: [{ model: Category, as: 'categories' }] // Include the categories in the response
        });

        if (!menus.length) {
            return res.status(404).json({ message: 'No menus found for this restaurant' });
        }

        res.status(200).json(menus);
    } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Update a menu item along with its categories
exports.updateMenu = async (req, res) => {
    const restaurantId = req.user.restaurantId;
    const { id } = req.params; // Get menu ID from request parameters

    if (!restaurantId) {
        return res.status(400).json({ message: 'Restaurant ID is required' });
    }

    try {
        const menuData = {
            name: req.body.name,
            image: req.body.image,
            details: req.body.details,
            deliveryFee: req.body.deliveryFee,
            restaurantId: restaurantId,
        };

        // Update the menu
        const menu = await Menu.findOne({ where: { id, restaurantId } });
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        await menu.update(menuData); // Update the menu details

        // Update categories - delete old categories and create new ones
        await Category.destroy({ where: { menuId: id } });

        const categories = req.body.categories || [];
        const categoryPromises = categories.map(category => {
            return Category.create({
                name: category.name,
                price: category.price,
                menuId: id
            });
        });

        await Promise.all(categoryPromises); // Wait for all categories to be updated

        res.status(200).json({ message: 'Menu updated successfully' });
    } catch (error) {
        console.error('Error updating menu:', error);
        res.status(400).json({ message: 'Error updating menu', error: error.message });
    }
};

// Get a single menu item by its ID along with categories
exports.getMenuById = async (req, res) => {
    const { id } = req.params; // Get the menu ID from request parameters
    const restaurantId = req.user.restaurantId;

    try {
        const menu = await Menu.findOne({
            where: { id, restaurantId },
            include: [{
                model: Category, // Include the Category model
                as: 'categories' // Use the alias you defined in associations
            }]
        });

        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        res.status(200).json(menu);
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};