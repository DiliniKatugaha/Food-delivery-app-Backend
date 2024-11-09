const Menu = require('../models/menuModel');
const Category = require('../models/categoryModel');

exports.createMenu = async (req, res) => {
    const restaurantId = req.user.restaurantId; 
    console.log('Request user:', req.user); 
    console.log('Request body:', req.body); 

    if (!restaurantId) {
        return res.status(400).json({ message: 'Restaurant ID is required' });
    }

    try {
        const menuData = {
            name: req.body.name,
            image: req.body.image,
            details: req.body.details,
            deliveryFee: req.body.deliveryFee,
            restaurantId: restaurantId 
        };

        if (!menuData.name || !menuData.details || !menuData.deliveryFee) {
            return res.status(400).json({ message: 'Name, details, and delivery fee are required' });
        }

        const newMenu = await Menu.create(menuData);

        const categories = req.body.categories || [];
        const categoryPromises = categories.map(category => {
            return Category.create({
                name: category.name,
                price: category.price,
                menuId: newMenu.id 
            });
        });

        await Promise.all(categoryPromises); 

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

exports.getMenu = async (req, res) => {
    const restaurantId = req.user.restaurantId;

    try {
        const menus = await Menu.findAll({
            where: { restaurantId },
            include: [{ model: Category, as: 'categories' }] 
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

exports.updateMenu = async (req, res) => {
    const restaurantId = req.user.restaurantId;
    const { id } = req.params;

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

        const menu = await Menu.findOne({ where: { id, restaurantId } });
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        await menu.update(menuData); 

        await Category.destroy({ where: { menuId: id } });

        const categories = req.body.categories || [];
        const categoryPromises = categories.map(category => {
            return Category.create({
                name: category.name,
                price: category.price,
                menuId: id
            });
        });

        await Promise.all(categoryPromises); 

        res.status(200).json({ message: 'Menu updated successfully' });
    } catch (error) {
        console.error('Error updating menu:', error);
        res.status(400).json({ message: 'Error updating menu', error: error.message });
    }
};

exports.getMenuById = async (req, res) => {
    const { id } = req.params; 
    const restaurantId = req.user.restaurantId;

    try {
        const menu = await Menu.findOne({
            where: { id, restaurantId },
            include: [{
                model: Category, 
                as: 'categories' 
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

exports.getMenuItemsByRestaurantId = async (req, res) => {
    try {
      const restaurantId = req.params.id;
  
      const menus = await Menu.findAll({
        where: { restaurantId: restaurantId },
        include: [
          {
            model: Category,
            as: 'categories', 
            attributes: ['id', 'name', 'price'], 
          }
        ]
      });
  
      if (menus.length === 0) {
        return res.status(404).json({ message: 'Menu data not found for this restaurant.' });
      }
  
      res.json(menus);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ error: 'An error occurred while fetching menu items.' });
    }
  };