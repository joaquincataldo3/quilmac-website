const express = require('express');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.home);

router.get('/equipos-apple-soporte', mainController.appleSupport);

router.get('/otros-equipos-soporte', mainController.otherDevicesSupport);

router.get('/contacto', mainController.contactUs);

module.exports = router;