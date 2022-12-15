const express = require('express');
const productsController = require('../controllers/productsController');
const adminRoutesMiddleware = require('../middlewares/rejectRoute');
const deviceCreationValidation = require("../middlewares/deviceCreationValidation");
const uploadImages = require("../middlewares/multerForCreation");

const router = express.Router();


router.get('/device/create', adminRoutesMiddleware, productsController.createDevice);
router.post("/device", uploadImages.array("device_images"), deviceCreationValidation, productsController.processDeviceCreation);

router.get("/accesory/create", adminRoutesMiddleware, productsController.accesoryCreation);
router.get("/accesory", productsController.processAccesoryCreation);

router.get('/update/:idProduct', productsController.updateOneDevice);
/* router.put('/update', productsController.processOneDeviceUpdate); */

router.get("/search", productsController.processHomeSearchBar);

router.get('/category/:idCategory', productsController.fetchCategory);

router.get('/:idProduct', productsController.fetchOneDevice);

module.exports = router;
