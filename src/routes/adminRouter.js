const express = require('express');
const adminController = require('../controllers/adminController');
const registerValidations = require("../middlewares/registerValidation");
const loginValidations = require("../middlewares/loginValidation");
const adminRoutesMiddleware = require('../middlewares/rejectRoute');
const deviceCreationValidation = require("../middlewares/deviceCreationValidation");
const accessoryCreationValidation = require("../middlewares/accessoryCreationValidation");
const uploadDeviceImages = require("../middlewares/multerForDeviceCreation");
const uploadAccessoryImages = require("../middlewares/multerForAccessoryCreation");

const router = express.Router();

router.get("/register", adminRoutesMiddleware, adminController.register);
router.get('/device/create', adminRoutesMiddleware, adminController.createDevice);
router.get("/accessory/create", adminRoutesMiddleware, adminController.accessoryCreation);
router.get("/accesorio", adminRoutesMiddleware, adminController.processAccessoryCreation);
router.get('/update/:idProduct', adminRoutesMiddleware, adminController.updateOneDevice);
router.get("/login", adminController.loginForm);
router.get('/logout', adminController.logout)


router.post("/" , registerValidations, adminController.processAdminRegister);
router.post("/device", uploadDeviceImages.array("device_images"), deviceCreationValidation,adminController.processDeviceCreation);
router.post("/accessory", uploadAccessoryImages.single("accessory_images"), accessoryCreationValidation,adminController.processAccessoryCreation);

router.post("/login", loginValidations, adminController.processLogin);

router.delete('/delete/:idProduct', adminController.destroyOneDevice);
router.delete('/delete/:idProduct', adminController.destroyOneAccessory);



module.exports = router;