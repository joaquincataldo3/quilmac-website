const express = require('express');
const productsController = require('../controllers/productsController');
const adminRoutesMiddleware = require('../middlewares/rejectRoute');
const deviceCreationValidation = require("../middlewares/deviceCreationValidation");
const accessoryCreationValidation = require("../middlewares/accessoryCreationValidation");
const uploadDeviceImages = require("../middlewares/multerForDeviceCreation");
const uploadAccessoryImages = require("../middlewares/multerForAccessoryCreation");

const router = express.Router();


router.get('/device/create', adminRoutesMiddleware, productsController.createDevice);

router.get("/accessory/create", adminRoutesMiddleware, productsController.accessoryCreation);

router.get("/accesorio", productsController.processAccessoryCreation);

router.get('/update/:idProduct', productsController.updateOneDevice);

router.get("/busqueda", productsController.processHomeSearchbar);

router.get('/categoria/:idCategory', productsController.fetchCategory);

router.get('/:idProduct', productsController.fetchOneDevice);



router.post("/device", uploadDeviceImages.array("device_images"), deviceCreationValidation, productsController.processDeviceCreation);

router.post("/accessory", uploadAccessoryImages.single("accessory_images"), accessoryCreationValidation, productsController.processAccessoryCreation);


/* router.put('/update', productsController.processOneDeviceUpdate); */

router.delete('/delete/:idProduct', productsController.destroyOneDevice);

router.delete('/delete/:idProduct', productsController.destroyOneAccessory);

router.delete('/delete/:idProduct', productsController.destroyOneAccessory);

module.exports = router;
