const { body } = require("express-validator");
const db = require("../database/models");

const validations = [ //when it comes to do validations, those have to be inside an array
    body("username").notEmpty().withMessage("You have to put an username"),

    body("password").notEmpty().withMessage("You have to put a password"),

    body("username")
        .custom(async (value, { req }) => {
            const adminAlreadyInDb = await db.Admin.findOne({
                where: {
                    username: req.body.username
                }
            })

            if (adminAlreadyInDb) {
                console.log('Admin Exists');
                return Promise.reject('Admin already exists');
            }

        })
]

module.exports = validations;