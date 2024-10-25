const signupModel = require('../models/SignupModel'); // Adjust the path if needed
const signupRes = new signupModel.Signup();
const updateRes = new signupModel.Update();

// Handle restaurant signup
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

// Handle restaurant update
exports.updateResDetails = async (req, res) => {
    try {
        // If you're expecting an uploaded file, ensure you handle that too
        const updatedRestaurant = await updateRes.updateResDetails(req.body, req.file); // req.file is for logo upload if needed
        console.log('Restaurant details updated:', updatedRestaurant);
        res.status(200).json({ message: 'Restaurant details updated successfully' });
    } catch (err) {
        console.error('Error updating restaurant details:', err);
        res.status(400).json({ message: err.message });
    }
};

// Optional: Uncomment if you have a signin function
/*
exports.signinDetails = async (req, res) => {
    try {
        const role = await signup.signinDetails(req.body);
        console.log(role);
        res.status(200).json({ role });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};
*/

// Optional: Uncomment if you have a customer details function
/*
const getCustomer = new signupModel.CustomerData();
exports.customerDetails = async (req, res) => {
    console.log(req.url);
    try {
        const data = await getCustomer.customerDetails();
        console.log(data);
        res.json(data);
    } catch (err) {
        console.error('Error fetching customer details:', err);
        res.status(500).json({ message: 'Failed to fetch customer details' });
    }
};
*/
