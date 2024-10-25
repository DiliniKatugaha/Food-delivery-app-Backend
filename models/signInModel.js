const validator = require('validator');  // Import validator for email validation
const bcrypt = require('bcrypt');
const User = require('./userModel'); // Import the User model (using Sequelize)

class Signin {
    async signinDetails(details) {
        const email = details.email.trim();
        const password = details.password;

        // Validate input
        if (!email || !password) throw new Error('Email and Password fields are required!');
        if (!validator.isEmail(email)) throw new Error('Email is not valid!');

        try {
            // Find the user by email using Sequelize
            const user = await User.findOne({ where: { email } });

            // Check if user exists
            if (!user) throw new Error('Invalid Email!');

            // Compare the input password with the stored hashed password
            const match = await bcrypt.compare(password, user.password);
            if (!match) throw new Error('Invalid credentials');

            // Log the user role to ensure it's correctly fetched
            console.log("User role from database:", user.role);

            // Return the user's role and restaurantId (if applicable)
            return { role: user.role, 
                restaurantId: user.restaurantId,
                customerId: user.customerId };

        } catch (error) {
            console.error('Database query failed:', error);
            throw new Error('An error occurred while processing your request');
        }
    }
}

module.exports = { Signin };