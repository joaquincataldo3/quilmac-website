const express = require('express');
const homeSearchbarController = require('../controllers/homeSearchbarController');

const router = express.Router();

router.get('/busqueda', homeSearchbarController.processHomeSearchbar);


module.exports = router;