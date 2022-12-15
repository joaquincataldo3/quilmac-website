const { body } = require("express-validator");
const db = require("../database/models");
const bcryptjs = require("bcryptjs");

const validations = [ //when it comes to do validations, those have to be inside an array

    body("username").notEmpty().withMessage("You have to put an username").bail(),

    body("password").notEmpty().withMessage("You have to put a password").bail(),    

]

module.exports = validations;