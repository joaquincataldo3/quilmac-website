const { body } = require("express-validator");
const db = require("../database/models");
const path = require('path')

const validations = [

    body("accessory").notEmpty().withMessage("Debés introducir el nombre del accesorio"),

    body("image")
        .custom((value, { req }) => {

            const bodyImage = req.file;
            const acceptedExtension = ['.jpg', '.jpeg', '.png'];

            if (!bodyImage) {
                throw new Error("Tenés que seleccionar una imagen")
            }

            const imageIsAccepted = acceptedExtension.includes(path.extname(bodyImage.originalname));

            if (!imageIsAccepted) {
                throw new Error(`Las extensiones aceptadas son ${acceptedExtension.join(', ')}`)
            }

            return true;

        }),


]

module.exports = validations;