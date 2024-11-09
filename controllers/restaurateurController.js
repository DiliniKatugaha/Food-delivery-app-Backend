const { Restaurateur } = require('../models/RestaurateurModel'); 

exports.getDetails = async (req, res) => {
    try {
        console.log(req.url);

        const data = await Restaurateur.getDetails(); 
        console.log(data); 

        res.json(data);
    } catch (error) {
        console.error('Error fetching restaurateur details:', error); 
        res.status(500).json({ message: 'An error occurred while fetching restaurateur details.' });
    }
};
