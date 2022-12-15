const db = require("../database/models");
const { validationResult } = require('express-validator');
const fs = require("fs");
const path = require("path");
const { Op } = require('sequelize');
const dbColors =  require('../../public/utils/getColors');
const dbCores =  require('../../public/utils/getCores');
const dbDeviceTypes =  require('../../public/utils/getDeviceTypes');
const dbMacbooks =  require('../../public/utils/getMacbooks');
const dbIphones =  require('../../public/utils/getIphones');
const dbStorages =  require('../../public/utils/getStorages');
const dbRams =  require('../../public/utils/getRams');
const dbSsds =  require('../../public/utils/getSsds');
const dbAppleDevices = require('../../public/utils/getAppleDevices.js');


const controller = {
    // device form creation view
    createDevice: async (req, res) => {
        try {
            return res.render("createDevice", { dbStorages: await dbStorages(), dbColors: await dbColors(), dbRams: await dbRams(), dbSsds: await dbSsds(), dbCores: await dbCores(), dbDeviceTypes: await dbDeviceTypes()});
        } catch (error) {
            console.log(error);
            return res.render('unexpectedError');
        }
    },
    // process the creation of a device
    processDeviceCreation: async (req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                console.log('errors')
                const oldBody = req.body;

                bodyImages?.forEach(image =>
                    fs.unlinkSync(path.join(__dirname, '../../public/images/devices/' + image.filename)) // borrar imagen en caso de que haya errors
                );


                return res.render("createDevice", { errors: errors.mapped(), oldBody, dbStorages: await dbStorages(), dbColors: await dbColors(), dbRams: await dbRams(), dbSsds: await dbSsds(), dbCores: await dbCores(), dbDeviceTypes: await dbDeviceTypes()})
            }

            const newDevice = await db.Device.create({
                model: req.body.model,
                screen: req.body.screen,
                technical_detail: req.body.technical_detail,
                release_date: req.body.release_date,
                device_type_id: req.body.device_type
            })

            const bodyImages = req.files;
            const { colors, storages, rams, cores, ssds } = req.body


            const deviceImages = bodyImages?.map(obj => {
                return {
                    image: obj.filename,
                    device_id: newDevice.id,
                    device_type_id: newDevice.device_type_id,
                }
            })
            await db.Image.bulkCreate(deviceImages);


            const deviceColors = colors?.map(color => {
                return {
                    color_id: color,
                    device_id: newDevice.id,
                    device_type_id: newDevice.device_type_id
                }
            }
            )
            await db.DeviceColor.bulkCreate(deviceColors);

            if (newDevice.device_type_id == 1) {
                const deviceStorages = storages?.map(storage => {
                    return {
                        storage_id: storage,
                        device_id: newDevice.id,
                        device_type_id: device_type
                    }
                }
                )
                await db.DeviceStorage.bulkCreate(deviceStorages);
            }

            if (newDevice.device_type_id != 1) {
                const deviceRams = rams?.map(ram => {
                    return {
                        ram_id: ram,
                        device_id: newDevice.id,
                        device_type_id: newDevice.device_type_id
                    }
                }
                )
                await db.DeviceRam.bulkCreate(deviceRams);
            }

            if (newDevice.device_type_id != 1) {
                const deviceCores = cores?.map(core => {
                    return {
                        core_id: core,
                        device_id: newDevice.id,
                        device_type_id: newDevice.device_type_id
                    }
                }
                )
                await db.DeviceCore.bulkCreate(deviceCores);
            }

            if (newDevice.device_type_id != 1) {
                const deviceSsds = ssds?.map(ssd => {
                    return {
                        ssd_id: ssd,
                        device_id: newDevice.id,
                        device_type_id: newDevice.device_type_id
                    }
                }
                )
                await db.DeviceSsd.bulkCreate(deviceSsds);
            }

            return res.redirect("/")

        } catch (error) {
            console.log(`Error while processing the device creation: ${error}`)
            const bodyImages = req.files;
            bodyImages?.forEach(image =>
                fs.unlinkSync(path.join(__dirname, '../../public/images/devices/' + image.filename)) // borrar imagen en caso de que haya errors
            );
            return res.render('unexpectedError');
        }

    },
    accesoryCreation: (req, res) => {
        return res.render('createAccesory')
    },
    processAccesoryCreation: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                const bodyImage = req.file.filename;

                if (bodyImage.length > 0) {
                    bodyImage.forEach(image =>
                        fs.unlinkSync(path.join(__dirname, '../../public/images/iphones/' + image.filename)) // borrar imagen en caso de que haya errors
                    );
                }

                return res.render("createDevice", { errors: errors.mapped(), oldBody, storages, colors, rams, ssds, cores, deviceTypes })
            }


        } catch (error) {
            console.log(error)
        }
    },
    processHomeSearchBar: async (req, res) => {
        try {
            const userSearch = req.query.q;

            const devices = db.Device.findAll({
                where: {
                    model: { [Op.like]: `%${userSearch}%` }
                }
            })

            const accesories = db.Accesories.findAll({
                where: {
                    model: { [Op.like]: `${userSearch}` }
                }
            })

            if (!(devices && accesories)) {
                return res.render('productNotFound')
            }

            if (devices && !accesories) {
                return res.render('searchProducts', { devices, dbStorages: await dbStorages(), dbColors: await dbColors(), dbRams: await dbRams(), dbSsds: await dbSsds(), dbCores: await dbCores(), dbDeviceTypes: await dbDeviceTypes()})
            }

            if (!devices && accesories) {
                return res.render('searchProducts', { accesories, dbStorages: await dbStorages(), dbColors: await dbColors(), dbRams: await dbRams(), dbSsds: await dbSsds(), dbCores: await dbCores(), dbDeviceTypes: await dbDeviceTypes()})
            }


        } catch (error) {
            console.log(error);
            return res.render('unexpectedError')
        }

    },
    fetchCategory: async (req, res) => {

        const idCategory = req.params.idCategory;
        const selectedCategory = await db.Device.findAll({
            where: {
                device_type_id: idCategory
            },
            include: ['images', 'colors'],
            order: [
                ['release_date', 'DESC']
            ]
        })

        return res.render('category', { selectedCategory, dbStorages: await dbStorages(), dbColors: await dbColors(), dbRams: await dbRams(), dbSsds: await dbSsds(), dbCores: await dbCores(), dbDeviceTypes: await dbDeviceTypes(), dbAppleDevices: await dbAppleDevices(), dbIphones: await dbIphones(), dbMacbooks: await dbMacbooks() })

    },
    fetchOneDevice: async (req, res) => {
        const idProduct = req.params.idProduct;
        const deviceToFetch = await db.Device.findByPk(idProduct);
       
        if (deviceToFetch && deviceToFetch.device_type_id == 1) {
            const deviceToFetch = await db.Device.findByPk(idProduct, { include: ['images', 'colors', 'storages'] })
            return res.render("singleDevice", {deviceToFetch, dbDeviceTypes: await dbDeviceTypes(), dbAppleDevices: await dbAppleDevices(), dbIphones : await dbIphones(), dbMacbooks : await dbMacbooks(), dbColors : await dbColors(), dbStorages: await dbStorages() })  
        } else {
           
            const deviceToFetch = await db.Device.findByPk(idProduct, { include: ['images', 'colors', 'ssds', 'rams', 'cores'] })
            return res.render("singleDevice", { deviceToFetch, dbDeviceTypes: await dbDeviceTypes(), dbAppleDevices: await dbAppleDevices(), dbIphones : await dbIphones(), dbMacbooks : await dbMacbooks(),  dbColors : await dbColors(), dbRams: await dbRams(), dbCores: await dbCores(), dbSsds: await dbSsds()})
        }
    },
    updateOneDevice: async (req, res) => {

        const idProduct = req.params.idProduct;
        const deviceToUpdate = await db.Device.findByPk(idProduct);
       
        if (deviceToUpdate && deviceToUpdate.device_type_id == 1) {
           
            const deviceToUpdate = await db.Device.findByPk(idProduct, { include: ['images', 'colors', 'storages'] })
            return res.render("updateDevice", {deviceToUpdate, dbDeviceTypes: await dbDeviceTypes(), dbAppleDevices: await dbAppleDevices(), dbIphones : await dbIphones(), dbMacbooks : await dbMacbooks(), dbColors : await dbColors(), dbStorages: await dbStorages() })  
        } else {
           
            const deviceToUpdate = await db.Device.findByPk(idProduct, { include: ['images', 'colors', 'ssds', 'rams', 'cores'] })
            return res.render("updateDevice", { deviceToUpdate, dbDeviceTypes: await dbDeviceTypes(), dbAppleDevices: await dbAppleDevices(), dbIphones : await dbIphones(), dbMacbooks : await dbMacbooks(),  dbColors : await dbColors(), dbRams: await dbRams(), dbCores: await dbCores(), dbSsds: await dbSsds()})
        }
    }

}

module.exports = controller;