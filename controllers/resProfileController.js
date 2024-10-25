const resProfileModel = require('../models/resProfileModel');

// Get restaurant profile
exports.getRestaurantProfile = async (req, res) => {
    try {
        const restaurantId = req.user.restaurantId; // Use restaurantId from decoded token
        if (!restaurantId) {
            return res.status(400).json({ message: 'Invalid restaurant ID' });
        }

        const restaurantDetails = await resProfileModel.getRestaurantDetailsByRestaurantId(restaurantId);

        if (!restaurantDetails) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.status(200).json(restaurantDetails);
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        res.status(500).json({ message: 'An error occurred while fetching data' });
    }
};

// Update restaurant profile
exports.updateRestaurantProfile = async (req, res) => {
    const { restaurantName, ownerName, contactNumber, openHours, deliveryPlaces, address, email } = req.body;

    if (!restaurantName || !ownerName || !contactNumber) {
        return res.status(400).json({ message: 'Restaurant name, owner name, and contact number are required' });
    }

    try {
        const restaurantId = req.user.restaurantId; // Use restaurantId from decoded token
        if (!restaurantId) {
            return res.status(400).json({ message: 'Invalid restaurant ID' });
        }

        let logoPath = null;
        if (req.file) {
            logoPath = req.file.path; // Path of the uploaded logo
        }

        const updatedRestaurant = await resProfileModel.updateRestaurantDetails(
            restaurantId, restaurantName, ownerName, contactNumber, openHours, deliveryPlaces, address, email, logoPath
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found or no changes made' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating restaurant data:', error);
        res.status(500).json({ message: 'An error occurred while updating data' });
    }
};
