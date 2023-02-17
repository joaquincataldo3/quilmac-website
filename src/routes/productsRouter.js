const express = require('express');
const productsController = require('../controllers/productsController');


const router = express.Router();


router.get('/categoria/:idCategory', productsController.fetchCategory);

router.get('/:idProduct', productsController.fetchOneDevice);





/* router.put('/update', productsController.processOneDeviceUpdate); */



module.exports = router;
