// profileModel.js

const db = require('../config/db');

class Profile {
    // Fetch customer details by email
    async getCustomerDetails(email) {
        try {
            const query = `SELECT username AS name, email, status, contact, hostel, address FROM customer WHERE email = ?`;
            const [rows] = await db.execute(query, [email]);

            // Return the first row or null if no user found
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error fetching customer details:', error);
            throw new Error('An error occurred while fetching customer details');
        }
    }

    // Update customer details
    async updateCustomerDetails(name, email, status, contact, hostel, address, currentEmail) {
        try {
            const query = `UPDATE customer SET username = ?, email = ?, status = ?, contact = ?, hostel = ?, address = ? WHERE email = ?`;
            const [result] = await db.execute(query, [name, email, status, contact, hostel, address, currentEmail]);

            // Check if any rows were affected
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating customer details:', error);
            throw new Error('An error occurred while updating customer details');
        }
    }
}


module.exports = new Profile();
