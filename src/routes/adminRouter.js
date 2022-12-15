const express = require('express');
const adminController = require('../controllers/adminController');
const registerValidations = require("../middlewares/registerValidation");
const loginValidations = require("../middlewares/loginValidation");
const adminRoutesMiddleware = require('../middlewares/rejectRoute');

const router = express.Router();

router.get("/register", adminRoutesMiddleware, adminController.register);
router.post("/" , registerValidations, adminController.processAdminRegister);

router.get("/login", adminController.loginForm);
router.post("/login", loginValidations, adminController.processLogin);

router.get('/logout', adminController.logout)

module.exports = router;