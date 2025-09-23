const db = require("../database/models");
const { validationResult } = require('express-validator');
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const getInDb = require('../utils/getInDb')
const { Op } = require('sequelize');
const {handleUploadImage, handleDeleteImage} = require('../helpers/cloudinaryHelper');
const cloudinaryHelper = require("../helpers/cloudinaryHelper");


const controller = {
    register: (req, res) => {
        try {
            return res.render("register", { admin: req.session.adminLogged })
        } catch (error) {
            console.log(`Fail while rendering register device page ${error}`)
            return res.render('unexpectedError')
        }
    },
    processAdminRegister: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const oldBody = req.body;
                return res.render("register", { errors: errors.mapped(), oldBody });
            }
            const { password, username } = req.body;
            const sanitizedUsername = username.trim();
            const sanitizedPassword = password.trim();
            const hashedPassword = await bcryptjs.hash(sanitizedPassword, 10);
            const newAdmin = {                   
                username: sanitizedUsername,
                password: hashedPassword
            }
            await db.Admin.create(newAdmin);
            return res.redirect("/admin/login");
        } catch (error) {
            console.log(`Fail while processing admin register : ${error}`);
            return res.render('unexpectedError');
        }
    },
    loginForm: (req, res) => {

        try {
            res.clearCookie('adminCookie');
            return res.render("login");
        } catch (error) {
            console.log(`Fail while rendering login page ${error}`)
            return res.render('unexpectedError')
        }

    },
    processLogin: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const oldBody = req.body;
                console.log(req.body);
                return res.render("login", { errors: errors.mapped(), oldBody });
            }
            const sanitizedUsername = req.body.username.trim();
            const adminInDb = await db.Admin.findOne({
                where: {
                    username: sanitizedUsername
                }
            })
            if (!adminInDb) {
                const oldBody = req.body;
                return res.render("login", { errors: { username: { msg: "There is no admin found with that username" } }, oldBody });
            }
            const sanitiziedPassword = req.body.password.trim();
            const verifyPassword = await bcryptjs.compare(sanitiziedPassword, adminInDb.password)
            if (!verifyPassword) {
                const oldBody = req.body;
                return res.render("login", { errors: { password: { msg: "Please enter a valid password" } }, oldBody });

            }
            const adminAuthenticated = adminInDb.username;
            if (req.body.remember_me) {
                res.cookie('adminCookie', adminAuthenticated, { maxAge: (60 * 1000) * 1000 })
            }
            req.session.adminLogged = adminAuthenticated;
            return res.redirect('/')
        } catch (error) {
            console.log(`Fail while processing admin login : ${error}`);
            return res.render('unexpectedError');
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("adminCookie");
        return res.redirect("/")
    },
    // device form creation view
    createDevice: async (req, res) => {
        try {
            return res.render("createDevice", { dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks(), dbAccessoryTypes: await getInDb.dbAccessoryTypes() });
        } catch (error) {
            console.log(`Fail while rendering creation device page ${error}`)
            return res.render('unexpectedError')
        }
    },
    // process the creation of a device
    processDeviceCreation: async (req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const oldBody = req.body;
                // const bodyImages = req.files;
                // if (bodyImages) {
                //     bodyImages.forEach(image =>
                //         fs.unlinkSync(path.join(__dirname, '../../public/images/devices/' + image.filename)) // borrar imagen en caso de que haya errors
                //     );
                // }
                return res.render("createDevice", { errors: 
                    errors.mapped(), oldBody, dbStorages:
                     await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), 
                     dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbIphones: await getInDb.dbIphones(), dbMacbooks: 
                     await getInDb.dbMacbooks() })
            }

            const newDevice = await db.Device.create({
                model: req.body.model,
                screen: req.body.screen,
                technical_detail: req.body.technical_detail,
                release_date: req.body.release_date,
                device_type_id: req.body.device_type
            })

            const bodyImages = req.files;
            const { colors, storages = null, rams = null, cores = null, ssds = null } = req.body
            const { id, device_type_id } = newDevice;

            if (bodyImages) {
                for(let i = 0; i < bodyImages.length; i++){
                    const image = bodyImages[i];
                    const result = await handleUploadImage(image, 'devices');
                    const { public_id, secure_url } = result;
                    await db.Image.create({
                        image: secure_url,
                        device_id: id,
                        device_type_id,
                        public_id
                    });
                }
            }
            let checkedColors = colors.length > 0 ? colors : Array.from(String(colors));
            const deviceColors = checkedColors.map(color => {
                return {
                    color_id: color,
                    device_id: id,
                    device_type_id: device_type_id
                }
            }
            )
            await db.DeviceColor.bulkCreate(deviceColors);

            const isIphone = device_type_id !== 1;
            switch(isIphone){
                case(true):
                    if (storages.length === 1) {

                        const storage = storages
                        const deviceStorages = {
                            storage_id: storage,
                            device_id: newDevice.id,
                            device_type_id: newDevice.device_type_id
                        }
                        await db.DeviceStorage.create(deviceStorages);
                    } else {

                        const deviceStorages = storages.map(storage => {
                            return {
                                storage_id: storage,
                                device_id: newDevice.id,
                                device_type_id: newDevice.device_type_id
                            }
                        }
                        )
                        await db.DeviceStorage.bulkCreate(deviceStorages);
                    }
                    break;
                case false:
                    const deviceRams = rams.map(ram => {
                        return {
                            ram_id: ram,
                            device_id: newDevice.id,
                            device_type_id: newDevice.device_type_id
                        }
                    }
                    )
                    await db.DeviceRam.bulkCreate(deviceRams);
                    const deviceCores = cores?.map(core => {
                        return {
                            core_id: core,
                            device_id: newDevice.id,
                            device_type_id: newDevice.device_type_id
                        }
                    }
                    )
                    await db.DeviceCore.bulkCreate(deviceCores);
                    const deviceSsds = ssds?.map(ssd => {
                        return {
                            ssd_id: ssd,
                            device_id: newDevice.id,
                            device_type_id: newDevice.device_type_id
                        }
                    })
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
        try {
            const idProduct = req.params.idProduct;
            const deviceToUpdate = await db.Device.findByPk(idProduct, { include: ['images', 'colors', 'storages', 'rams', 'ssds', 'cores'] });
            return res.render('updateDevice', { deviceToUpdate, dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks(), dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbCores: await getInDb.dbCores(), dbSsds: await getInDb.dbSsds() })
        } catch (error) {
            console.log(`Fail while rendering update device page ${error}`)
            return res.render('unexpectedError')
        }
    },
    processDeviceUpdate: async (req, res) => {
        try {
            const idProduct = req.params.idProduct;
            const deviceToUpdate = await db.Device.findByPk(idProduct, { include: ['images', 'colors', 'storages', 'rams', 'ssds', 'cores'] })



            await db.Device.update({
                model: req.body.model,
                screen: req.body.screen,
                technical_detail: req.body.technical_detail,
                release_date: req.body.release_date,
                device_type_id: req.body.device_type
            }, {
                where: {
                    id: idProduct
                }
            })

            const {device_type_id, id} = deviceToUpdate;
            let imgIdsToDelete = [];

            
            if(deviceToUpdate.images.length > 0 && req.body.current_imgs?.length > 0){
                deviceToUpdate.images.filter(image => { 
                    if (!req.body.current_imgs.includes(image)) {
                        return imgIdsToDelete.push(image)
                    }
                })
                if (imgIdsToDelete.length > 0) {
                    for(let i = 0; i < imgIdsToDelete.length; i++){
                        const {id, public_id} = imgIdsToDelete;
                        await db.Image.destroy({
                            where: {
                                id
                            },
                            force: true
                        }) 
                        await handleDeleteImage(public_id);
                    }
                }
            } else if(deviceToUpdate.images.length > 0 && !req.body.current_imgs){
                
                const deviceImages = await db.Image.findAll({
                    where: {
                        device_id: id
                    }
                })
                for(let i = 0; i < deviceImages.length; i++){
                    const deviceImage = deviceImages[i];
                    await handleDeleteImage(deviceImage.pubic_id);
                }
                await db.Image.destroy({
                    where: {
                        device_id: id
                    },
                    force: true
                }) 
            }
        
            const bodyImages = req.files;
            const { colors, storages, rams, cores, ssds } = req.body
          
            if (bodyImages.length > 0) {
                for(let i = 0; i < bodyImages.length; i++){
                    const image = bodyImages[i];
                    const result = await handleUploadImage(image, 'devices');
                    const { public_id, secure_url } = result;
                    await db.Image.create({
                        image: secure_url,
                        device_id: id,
                        device_type_id,
                        public_id
                    });
                }
            }

            if (colors.length > 0) {
                let arrayConverted = colors.length === 1 ? Array.from(String(colors)) : colors;
                await db.DeviceColor.destroy({
                    where: {
                        device_id: id
                    }
                }) // cleaning up storages before creating new data

                const deviceColors = arrayConverted.map(color => {
                    return {
                        color_id: color,
                        device_id: id,
                        device_type_id: device_type_id
                    }
                }
                )
                await db.DeviceColor.bulkCreate(deviceColors);
            }

            const isIphoneType = device_type_id !== 1;
            switch(isIphoneType){
                case true:
                    await db.DeviceRam.destroy({
                        where: {
                            device_id: id
                        }
                    })
    
                    const deviceRams = rams.map(ram => {
                        return {
                            ram_id: ram,
                            device_id: id,
                            device_type_id: device_type_id
                        }
                    }
                    )
                    await db.DeviceRam.bulkCreate(deviceRams);
                    await db.DeviceSsd.destroy({
                        where: {
                            device_id: id
                        }
                    })
    
                    const deviceSsds = ssds.map(ssd => {
                        return {
                            ssd_id: ssd,
                            device_id: id,
                            device_type_id: device_type_id
                        }
                    }
                    )
                    await db.DeviceSsd.bulkCreate(deviceSsds);
                    await db.DeviceCore.destroy({
                        where: {
                            device_id: id
                        }
                    })
    
                    const deviceCores = cores.map(core => {
                        return {
                            core_id: core,
                            device_id: id,
                            device_type_id: device_type_id
                        }
                    }
                    )
                    await db.DeviceCore.bulkCreate(deviceCores);
                case false:
                    await db.DeviceStorage.destroy({
                        where: {
                            device_id: id
                        }
                    }) // cleaning up storages before creating new data


                    const deviceStorages = storages.map(storage => {
                        return {
                            storage_id: storage,
                            device_id: id,
                            device_type_id: device_type_id
                        }
                    }
                    )
                    await db.DeviceStorage.bulkCreate(deviceStorages);
                    
            }
            return res.redirect('/')
        } catch (error) {
            console.log(`Fail while processing device creation ${error}`)
            return res.render('unexpectedError')
        }


    },
    destroyOneDevice: async (req, res) => {
        try {
            const deviceToDelete = await db.Device.findByPk(req.params.idProduct);
            const {id} = deviceToDelete;
            const deviceImages = await db.Image.findAll({
                where: {
                    device_id: id
                }
            })
            for(let i = 0; i < deviceImages.length; i++){
                console.log('device images')
                console.log(deviceImages[i])
                await handleDeleteImage(deviceImages[i].public_id)
            }
            let isIphone = deviceToDelete.device_type_id !== 1;
            switch(isIphone){
                case true:
                    await db.DeviceStorage.destroy({
                        where: {
                            device_id: id
                        }
                    })
                case false:
                    await db.DeviceSsd.destroy({
                        where: {
                            device_id: id
                        }
                    })
                    await db.DeviceCore.destroy({
                        where: {
                            device_id: id
                        }
                    })
                    await db.DeviceRam.destroy({
                        where: {
                            device_id: id
                        }
                    })
                    
            }
            await db.DeviceColor.destroy({
                where: {
                    device_id: id
                }
            })
            await db.Device.destroy({
                where: {
                    id
                }
            })
            
            return res.status(200).json({
                success: true,
            })
        } catch (error) {
            console.log(`Failed while trying to delete a device: ${error}`);
            return res.status(500).json({
                success: false,
            })
        }
    },
    accessoryCreation: async (req, res) => {



        return res.render('createAccesory', { dbAccessoryTypes: await getInDb.dbAccessoryTypes(), dbBrands: await getInDb.dbBrands() })
    },
    processAccessoryCreation: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                
                const bodyImage = req.file.filename;
                const oldBody = req.body;
                const accessoryTypes = await db.AccessoryType.findAll()
                console.log(errors)
               
                // fs.unlinkSync(path.join(__dirname, '../../public/images/accessories/' + bodyImage)) // borrar imagen en caso de que haya errors
                  

                return res.render("createAccesory", { errors: errors.mapped(), oldBody, accessoryTypes })
            }


            const accessoryToCreate = {
                accessory: req.body.accessory,
                image: req.file.filename,
                price: req.body.price ? req.body.price : 0,
                accessory_type_id: req.body.type,
                
                brand_id: req.body.brand
            }

           await db.Accessory.create(accessoryToCreate)

            return res.redirect('/')


        } catch (error) {
            const bodyImage = req.file.filename;
            fs.unlinkSync(path.join(__dirname, '../../public/images/accessories/' + bodyImage)) // borrar imagen en caso de que haya errors
            return res.send(error)
            return res.render("unexpectedError.ejs")
        }
    },
    accessoryUpdate: async (req, res) => {
        try {
            const idAccessory = req.params.idAccessory;
            const accessoryToUpdate = await db.Device.findByPk(idAccessory, { include: ['types', 'brands'] });
            return res.render('updateAccessory', {accessoryToUpdate, dbAccessoryTypes: await getInDb.dbAccessoryTypes(), dbBrands: await getInDb.dbBrands() })
        } catch (error) {
            console.log(`Fail while rendering update accessory page ${error}`)
            return res.render('unexpectedError')
        }
    },
    destroyOneAccessory: async (req, res) => {
        try {
           console.log(req.params.idAccessory)
            const accessoryToDelete = await db.Accessory.findByPk(req.params.idAccessory)

            await db.Accessory.destroy({
                where: {
                    id: accessoryToDelete.id
                }
            }) 
            return res.redirect('/')
        } catch (error) {
            console.log(`Failed while trying to delete an accessory: ${error}`);
            return res.redirect('/')
        }
    }
}

module.exports = controller;