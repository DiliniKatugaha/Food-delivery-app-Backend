const signupModel = require('../models/SignupModel');
const signupRes = new signupModel.Signup();
const updateRes = new signupModel.Update();

exports.signupResDetails = async (req, res) => {
    try {
        const newRestaurant = await signupRes.signupResDetails(req.body);
        console.log('New restaurant registered:', newRestaurant);
        res.status(201).json({ message: 'Restaurant registered successfully', restaurant: newRestaurant });
    } catch (err) {
        console.error('Error during restaurant signup:', err);
        res.status(400).json({ message: err.message });
    }
};

exports.updateResDetails = async (req, res) => {
    try {
        const updatedRestaurant = await updateRes.updateResDetails(req.body, req.file);
        console.log('Restaurant details updated:', updatedRestaurant);
        res.status(200).json({ message: 'Restaurant details updated successfully' });
    } catch (err) {
        console.error('Error updating restaurant details:', err);
        res.status(400).json({ message: err.message });
    }
};

