const express = require('express');
const adminController = require('../controllers/adminController');
const registerValidations = require("../middlewares/registerValidation");
const loginValidations = require("../middlewares/loginValidation");
const accessoryCreationValidation = require("../middlewares/accessoryCreationValidation");
const deviceCreationValidation = require('../middlewares/deviceCreationValidation');
const adminRoutesMiddleware = require('../middlewares/rejectRoute');
const uploadDeviceImages = require("../middlewares/multerForDeviceCreation");
const uploadAccessoryImages = require("../middlewares/multerForAccessoryCreation");
const rejectRoute = require('../middlewares/rejectRoute')

const router = express.Router();

router.get("/register", adminController.register);
router.get("/login", adminController.loginForm);
router.get('/logout', adminController.logout)
router.get('/device/create', adminRoutesMiddleware,adminController.createDevice);
router.get("/accessory/create", adminRoutesMiddleware,adminController.accessoryCreation);
router.get('/update/:idProduct',adminController.updateOneDevice);

router.post("/" , registerValidations, adminController.processAdminRegister);
router.post("/login", loginValidations, adminController.processLogin);
router.post("/accessory", uploadAccessoryImages.single("image"), accessoryCreationValidation,adminController.processAccessoryCreation);
router.post("/device", uploadDeviceImages.array("device_images"), deviceCreationValidation,adminController.processDeviceCreation);

router.put('/device/update/:idProduct', uploadDeviceImages.array("device_images"), adminController.processDeviceUpdate);

router.delete('/delete/:idProduct',adminController.destroyOneDevice);
router.delete('/delete/:idProduct',adminController.destroyOneAccessory);
router.delete('/delete/:idAccessory',adminController.destroyOneAccessory);


router.post("/" , registerValidations, adminController.processAdminRegister);
router.post("/device", uploadDeviceImages.array("device_images"), deviceCreationValidation,adminController.processDeviceCreation);
router.post("/accessory", uploadAccessoryImages.single("accessory_images"), accessoryCreationValidation,adminController.processAccessoryCreation);

router.post("/login", loginValidations, adminController.processLogin);

router.delete('/delete/device/:idProduct', adminController.destroyOneDevice);
router.delete('/delete/accessory/:idAccessory', adminController.destroyOneAccessory);



module.exports = router;