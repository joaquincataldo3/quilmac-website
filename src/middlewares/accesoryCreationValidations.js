const { body } = require("express-validator");
const db = require("../database/models");

const validations = [

    body("name").notEmpty().withMessage("You have to put the name of the deviec"),

    body("accesory_image")
            .custom((value, {req}) => {
                
                if(req.file == 0) {
                    throw new Error ("Don't forget to choose the images !")
                }

            })
]

module.exports = validations;