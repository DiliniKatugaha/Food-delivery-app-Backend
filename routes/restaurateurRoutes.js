const express = require('express');
const controller = require('../controllers/restaurateurController');

const router = express.Router();

router.route('/getDetails').get(controller.getDetails);


module.exports= router;
