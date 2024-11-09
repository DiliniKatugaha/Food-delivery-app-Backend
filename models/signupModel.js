const User = require('./userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Restaurateur = sequelize.define('restaurateur', {
    res_id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    ownername: {  
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    contact: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    openHours: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    deliveryPlaces: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    logo: {
        type: DataTypes.BLOB('long'), 
        allowNull: true,
    },
}, {
    timestamps: true, 
    tableName: 'Restaurateur', 
});


class Signup {
    async signupResDetails(details) {
        if (!details.email || !details.password) throw new Error('Email and Password Fields are required!');
        if (!validator.isEmail(details.email)) throw new Error('Email is not valid!');
        if (!validator.isStrongPassword(details.password)) throw new Error('Password is not strong enough!');

        const existingUser = await User.findOne({ where: { email: details.email } });
        if (existingUser) throw new Error('Email already signed up!');

        const hash = await bcrypt.hash(details.password, 10);

const newUser = await User.create({
    username: details.username,
    email: details.email,
    password: hash,
    role: 'Restaurateur',
    restaurantId: details.restaurantId, 
});

        await Restaurateur.create({
            username: details.username,
            ownername: details.ownername,
            email: details.email,
            contact: details.contact,
            password: hash,
        })

        return newUser;
    }

     
    
}


class Update {
    async updateResDetails(details, logoFile) {
        if (!validator.isEmail(details.email)) throw new Error('Email is not valid!');
        if (!details.username || !details.ownername || !details.contact) {
            throw new Error('All fields are required!');
        }

        const existingUser = await User.findOne({ where: { email: details.email } });
        if (!existingUser) {
            throw new Error('Restaurant with the given email does not exist!');
        }

        let sql = `UPDATE restaurateur SET username = ?, ownername = ?, contact = ? WHERE email = ?`;
        const params = [details.username, details.ownername, details.contact, details.email];

        if (logoFile) {
            const logoData = fs.readFileSync(logoFile.path); 
            sql = `UPDATE restaurateur SET username = ?, ownername = ?, contact = ?, logo = ? WHERE email = ?`;
            params.splice(3, 0, logoData); 
        }

        await db.execute(sql, params)
            .then((data) => {
                console.log('Profile updated successfully:', data[0]);
            })
            .catch((err) => {
                console.error('Error updating profile:', err.message);
                throw new Error(err.message);
            });
    }
}

module.exports = { Signup, Update };