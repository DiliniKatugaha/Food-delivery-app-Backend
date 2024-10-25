const { Restaurateur } = require('../models/RestaurateurModel'); // Ensure this is the correct path

exports.getDetails = async (req, res) => {
    try {
        console.log(req.url); // Log the request URL for debugging

        const data = await Restaurateur.getDetails(); // Call the static method directly on the class
        console.log(data); // Log the retrieved data for debugging

        res.json(data);
    } catch (error) {
        console.error('Error fetching restaurateur details:', error); // Log the error
        res.status(500).json({ message: 'An error occurred while fetching restaurateur details.' }); // Send an error response
    }
};
