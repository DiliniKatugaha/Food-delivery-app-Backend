const db = require('../config/db');

class Profile {
    async getCustomerDetails(email) {
        try {
            const query = `SELECT username AS name, email, status, contact, hostel, address FROM customer WHERE email = ?`;
            const [rows] = await db.execute(query, [email]);

            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error fetching customer details:', error);
            throw new Error('An error occurred while fetching customer details');
        }
    }

    async updateCustomerDetails(name, email, status, contact, hostel, address, currentEmail) {
        try {
            const query = `UPDATE customer SET username = ?, email = ?, status = ?, contact = ?, hostel = ?, address = ? WHERE email = ?`;
            const [result] = await db.execute(query, [name, email, status, contact, hostel, address, currentEmail]);

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating customer details:', error);
            throw new Error('An error occurred while updating customer details');
        }
    }
}


module.exports = new Profile();
