const express = require('express');
const accessoriesController = require('../controllers/accessoriesController')

const router = express.Router();

router.get('/categoria/:idCategory', accessoriesController.fetchCategory)

module.exports = router;
