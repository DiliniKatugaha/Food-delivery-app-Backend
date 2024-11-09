const validator = require('validator');  
const bcrypt = require('bcrypt');
const User = require('./userModel');

class Signin {
    async signinDetails(details) {
        const email = details.email.trim();
        const password = details.password;

        if (!email || !password) throw new Error('Email and Password fields are required!');
        if (!validator.isEmail(email)) throw new Error('Email is not valid!');

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) throw new Error('Invalid Email!');

            const match = await bcrypt.compare(password, user.password);
            if (!match) throw new Error('Invalid credentials');

            console.log("User role from database:", user.role);

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