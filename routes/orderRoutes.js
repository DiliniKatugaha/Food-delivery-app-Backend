const express = require('express');
const controller = require('../controllers/orderController');

const router = express.Router();

router.route('/getItems').get(controller.getItem);


module.exports= router;
