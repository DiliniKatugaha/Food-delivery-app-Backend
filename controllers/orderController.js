const orderModel = require('../models/orderModel');

const orderIns = new orderModel.Order();
exports.getItem  = async (req,res)=>{
    console.log(req.url)

    orderIns.getItems().then((data)=>{
        console.log(data)
        res.json(data);
    });
    
}
