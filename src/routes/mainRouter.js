const express = require('express');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.home);

router.get('/iphones-ipad-serviciotecnico', mainController.iphonesIpadsSupport);

router.get('/macbooks-imacs-serviciotecnico', mainController.macbooksIpadsSupport);

router.get('/otros-equipos-soporte', mainController.otherDevicesSupport);

router.get('/contacto', mainController.contactUs);

module.exports = router;