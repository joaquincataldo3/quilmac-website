const { body } = require("express-validator");
const path = require('path');
const db = require("../database/models");

const validations = [ //when it comes to do validations, those have to be inside an array
    body("device_type").notEmpty().withMessage("You have to select a device type"),

    body("model").notEmpty().withMessage("You have to put the model"),

    body("screen").notEmpty().withMessage("You have to put the screen type"),

    body("technical_detail").notEmpty().withMessage("You have to put the link to the technical detail"),

    body("release_date").notEmpty().withMessage("You have to select the release date"),

    body("colors").notEmpty().withMessage("You have to select the colors"),

    body("device_type")
        .custom(async (value, { req }) => { // checking if the device type matches with the body
            try {
                const deviceTypes = await db.DeviceType.findAll();
                const modelBody = req.body.model.toLowerCase();
                const deviceTypeInBody = req.body.device_type;
                               

                const deviceTypeInModel = deviceTypes.find(type =>{ //finding if the device type is written in the model input
                    const typeToLowerCase = type.type.toLowerCase();
                    return modelBody.includes(typeToLowerCase)
                });


                if(!deviceTypeInModel) { // if false, we find the name of the device type selected in input one, and we reject the promise
                    const deviceTypeSelected = deviceTypes.find(type => type.id == deviceTypeInBody).type
                    return Promise.reject(`En el modelo debe estar aclarado el tipo de producto: ${deviceTypeSelected}`)
                }

                for(let i = 0; i < deviceTypes.length ; i++) {  // in this validation, we are checking if the model and device type match           
                    if(deviceTypes[i].id == deviceTypeInBody && !modelBody.includes(deviceTypes[i].type.toLowerCase())){
                        return Promise.reject('El modelo y el device type no coinciden')
                    }
                }

                return true;

            } catch (error) {
                console.log(`Fallé en la validación del device type: ${error}`);
            }


        }),

    body("device_images") //checking for accepted images
        .custom((value, { req }) => {

            const bodyImages = req.files;
            const acceptedExtension = ['.jpg', '.jpeg', '.png'];

            if (!bodyImages) {
                throw new Error("Tenés que seleccionar las imagenes")
            }

            bodyImages.forEach(image => {

                const imageIsAccepted = acceptedExtension.includes(path.extname(image.originalname));

                if (!imageIsAccepted) {
                    throw new Error(`Las extensiones aceptadas son ${acceptedExtension.join(', ')}`)
                }


            })

            return true;

        }),

    // checking if we have unexpected fields selected while creating products
    body("storages")
        .custom((value, { req }) => {

            const storages = req.body.storages;
            const bodyDeviceType = req.body.device_type;

            if (storages && bodyDeviceType != 1) {
                throw new Error("Este campo es solo para iphones")
            }

            return true;

        }),

    body("storages")
        .custom((value, { req }) => {

            const bodyDeviceType = req.body.device_type;
            const bodyStorages = req.body.storages;

            if (bodyDeviceType == 1 && !bodyStorages) {
                throw new Error("Si estás creando un Iphone, debes seleccionar este campo")
            }

            return true;

        }),

    // checking if we have unexpected fields selected for macbooks, imacs or macsmini
    body("rams", "cores", "ssds")
        .custom((value, { req }) => {

            const bodyDeviceType = req.body.device_type;
            const bodyRams = req.body.rams;
            const bodyCores = req.body.cores;
            const bodySsds = req.body.ssds;

            if (bodyDeviceType != 1 && (!(bodyCores || bodyRams || bodySsds))) {
                throw new Error("Si estás creando una Macbook, Imac o Mac Mini, debes seleccionar este campo")
            }

            return true;

        }),

    // checking if we have unexpected fields selected for macbooks, imacs or macsmini
    body("rams", "cores", "ssds")
        .custom((value, { req }) => {

            const bodyDeviceType = req.body.device_type;
            const bodyRams = req.body.rams;
            const bodyCores = req.body.cores;
            const bodySsds = req.body.ssds;

            if (bodyDeviceType == 1 && (bodyCores || bodyRams || bodySsds)) {
                throw new Error("Este checkbox es solo para Macbooks, Macs Mini y Imacs")
            }

            return true;

        }),


]

module.exports = validations;
