const db = require("../database/models");
const { validationResult } = require('express-validator');
const fs = require("fs");
const path = require("path");
const { Op } = require('sequelize');
const getInDb = require('../utils/getInDb');



const controller = {
    // device form creation view
    createDevice: async (req, res) => {
        try {
            return res.render("createDevice", { dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks() });
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

                const bodyImages = req.files;
                if (bodyImages) {
                    bodyImages.forEach(image =>
                        fs.unlinkSync(path.join(__dirname, '../../public/images/devices/' + image.filename)) // borrar imagen en caso de que haya errors
                    );
                }
                return res.render("createDevice", { errors: errors.mapped(), oldBody, dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks() })
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


            if (bodyImages) {
                const deviceImages = bodyImages?.map(obj => {
                    return {
                        image: obj.filename,
                        device_id: newDevice.id,
                        device_type_id: newDevice.device_type_id,
                    }
                })
                await db.Image.bulkCreate(deviceImages);
            }

            if (colors) {
                const deviceColors = colors?.map(color => {
                    return {
                        color_id: color,
                        device_id: newDevice.id,
                        device_type_id: newDevice.device_type_id
                    }
                }
                )
                await db.DeviceColor.bulkCreate(deviceColors);
            }


            if (newDevice.device_type_id == 1) {
                const deviceStorages = storages?.map(storage => {
                    return {
                        storage_id: storage,
                        device_id: newDevice.id,
                        device_type_id: newDevice.device_type_id
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
            if (bodyImages) {
                bodyImages?.forEach(image =>
                    fs.unlinkSync(path.join(__dirname, '../../public/images/devices/' + image.filename)) // borrar imagen en caso de que haya errors
                );
            }
            return res.render('unexpectedError');
        }

    },
    updateOneDevice: async (req, res) => {

        const idProduct = req.params.idProduct;
        const deviceToUpdate = await db.Device.findByPk(idProduct, { include: ['images', 'colors', 'storages', 'rams', 'ssds', 'cores'] });
        /* return res.send(deviceToUpdate) */
        return res.render('updateDevice', { deviceToUpdate, dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks(), dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(),  dbRams: await getInDb.dbRams(), dbCores: await getInDb.dbCores(), dbSsds: await getInDb.dbSsds()})
    },
    destroyOneDevice: async (req, res) => {
        try {
            const deviceToDelete = await db.Device.findByPk(req.params.idProduct);
            await db.Device.destroy({
                where: {
                    id: deviceToDelete.id
                }
            })
            return res.redirect('/')
        } catch (error) {
            console.log(`Failed while trying to delete a device: ${error}`);
            return res.redirect('/')
        }
    },
    accessoryCreation: async (req, res) => {

        const accessoryTypes = await db.AccessoryType.findAll()

        return res.render('createAccesory', { accessoryTypes })
    },
    processAccessoryCreation: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {


                const bodyImage = req.file.filename;
                const oldBody = req.body;
                const accessoryTypes = await db.Accessory.findAll()

                if (bodyImage.length > 0) {
                    bodyImage.forEach(image =>
                        fs.unlinkSync(path.join(__dirname, '../../public/images/iphones/' + image.filename)) // borrar imagen en caso de que haya errors
                    );
                }

                return res.render("createDevice", { errors: errors.mapped(), oldBody, accessoryTypes })
            }


            const accessoryToCreate = await db.Accessory.create({
                accessory: accessory,
                image: req.body.filename,
                price: req.body.price,
                accessory_type_id: req.body.accessory_type
            })


            return res.redirect('/')


        } catch (error) {
            console.log(`Error while trying to process the device creation: ${error}`);
            return res.render("unexpectedError.ejs")
        }
    },
    destroyOneAccessory: async (req, res) => {
        try {
            const accessoryToDelete = await db.Accessory.findByPk(req.params.idProduct);
            await db.Device.destroy({
                where: {
                    id: accessoryToDelete.id
                }
            })
            return res.redirect('/')
        } catch (error) {
            console.log(`Failed while trying to delete an accessory: ${error}`);
            return res.redirect('/')
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

            if (!(devices && accesories)) { // todo: ask in searchProducts view if search.length is > 0
                return res.render('searchProducts', { search: [] })
            }

            if (devices && !accesories) {
                return res.render('searchProducts', { search: devices, dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks() })
            }

            if (!devices && accesories) {
                return res.render('searchProducts', { search: accesories, dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks() })
            }


        } catch (error) {
            console.log(`Fallé en accesory creation: ${error}`);
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

        return res.render('category', { selectedCategory, dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks(), dbAppleDevices: await getInDb.dbAppleDevices() })

    },
    fetchOneDevice: async (req, res) => {
        const idProduct = req.params.idProduct;
        const deviceToFetch = await db.Device.findByPk(idProduct, { include: ['images', 'colors', 'storages', 'rams', 'ssds', 'cores'] });
        return res.render('singleDevice', { deviceToFetch, dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks(), dbStorages: await getInDb.dbStorages() })

        /* if (deviceToFetch && deviceToFetch.device_type_id == 1) {
            const deviceToFetch = await db.Device.findByPk(idProduct, { include: ['images', 'colors', 'storages'] })
            return res.render("singleDevice", {deviceToFetch, dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones : await getInDb.dbIphones(), dbMacbooks : await getInDb.dbMacbooks(), dbStorages: await getInDb.dbStorages() })  
        } else {
            const deviceToFetch = await db.Device.findByPk(idProduct, { include: ['images', 'colors', 'ssds', 'rams', 'cores'] })
            return res.render("singleDevice", { deviceToFetch, dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones : await getInDb.dbIphones(), dbMacbooks : await getInDb.dbMacbooks(),  dbColors : await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbCores: await getInDb.dbCores(), dbSsds: await getInDb.dbSsds()})
        } */
    },

}

module.exports = controller;