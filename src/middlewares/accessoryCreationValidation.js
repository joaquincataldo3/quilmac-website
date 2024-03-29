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

    body("type")
        .custom(async (value, { req }) => { // checking if the device type matches with the body
            try {
                const accessoryTypes = await db.AccesoryType.findAll();
                const accessoryBody = req.body.accessory.toLowerCase();
                const accessoryTypeInBody = req.body.type;


                const accessoryTypeInModel = accessoryTypes.find(type => { //finding if the device type is written in the model input
                    const typeToLowerCase = type.type.toLowerCase();
                    return accessoryBody.includes(typeToLowerCase)
                });


                if (!accessoryTypeInModel) { // if false, we find the name of the device type selected in input one, and we reject the promise
                    const accessoryTypeSelected = accessoryTypes.find(type => type.id == accessoryTypeInBody).type
                    return Promise.reject(`En el modelo debe estar aclarado el tipo de accesorio: ${accessoryTypeSelected}`)
                }

                for (let i = 0; i < accessoryTypes.length; i++) {  // in this validation, we are checking if the model and device type match           
                    if (accessoryTypes[i].id == accessoryTypeInBody && !accessoryBody.includes(accessoryTypes[i].type.toLowerCase())) {
                        return Promise.reject('El accesorio y el tipo de accesorio no coinciden')
                    }
                }

                return true;

            } catch (error) {
                console.log(`Error while validating the accessory type and accessory name: ${error}`);

            }


        })


]

module.exports = validations;