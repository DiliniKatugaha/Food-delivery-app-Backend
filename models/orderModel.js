const db = require('../config/db');
class Order {
    constructor(item, price, quantity, customerId) {
        this.item = item,
            this.price = price,
            this.quantity = quantity,
            this.customerId = customerId
    }


    async getItems() {

        const query = `SELECT * FROM stock`
        const res = await db.execute(query).then(data => data[0])
            .catch(err => err)

        return res

    }


}



module.exports = { Order };