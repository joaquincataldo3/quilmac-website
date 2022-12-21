const express = require('express');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.home);

router.get('/apple-devices-suport', mainController.appleSupport);


module.exports = router;