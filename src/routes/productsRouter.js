const express = require('express');
const productsController = require('../controllers/productsController');
const accessoriesController = require('../controllers/accessoriesController')

const router = express.Router();

router.get('/categoria/:idCategory', productsController.fetchCategory);
router.get('/:idProduct', productsController.fetchOneDevice);

module.exports = router;
