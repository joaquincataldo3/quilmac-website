const express = require('express');
const adminController = require('../controllers/adminController');
const registerValidations = require("../middlewares/registerValidation");
const loginValidations = require("../middlewares/loginValidation");
const accessoryCreationValidation = require("../middlewares/accessoryCreationValidation");
const deviceCreationValidation = require('../middlewares/deviceCreationValidation');
const adminRoutesMiddleware = require('../middlewares/rejectRoute');

const router = express.Router();

router.get("/register", adminRoutesMiddleware, adminController.register);
router.get("/login", adminController.loginForm);
router.get('/logout', adminController.logout)
router.get('/device/create', adminRoutesMiddleware,adminController.createDevice);
router.get("/accessory/create", adminRoutesMiddleware,adminController.accessoryCreation);
router.get('/update/:idProduct',adminController.updateOneDevice);

router.post("/" , registerValidations, adminController.processAdminRegister);
router.post("/login", loginValidations, adminController.processLogin);
router.post("/accessory", uploadAccessoryImages.single("accessory_images"), accessoryCreationValidation,adminController.processAccessoryCreation);
router.post("/device", uploadDeviceImages.array("device_images"), deviceCreationValidation,adminController.processDeviceCreation);

/* router.put('/update',adminController.processOneDeviceUpdate); */

router.delete('/delete/:idProduct',adminController.destroyOneDevice);
router.delete('/delete/:idProduct',adminController.destroyOneAccessory);
router.delete('/delete/:idProduct',adminController.destroyOneAccessory);

module.exports = router;