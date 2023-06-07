const db = require("../database/models");
const {Op} = require('sequelize');
const getInDb = require('../utils/getInDb');


const controller = {
    processHomeSearchbar: async (req, res) => {
        try {

            const userSearch = req.query.s;

            const devices = await db.Device.findAll({
                where: {
                    model:  {[Op.like]: `%${userSearch}%`} 
                }, include: ['images', 'colors', 'storages']})


            const accessories = await db.Accessory.findAll({
                where: {
                    accessory: { [Op.like]: `${userSearch}` }
                }
            })


            if (devices.length == 0 && accessories.length == 0) { // todo: ask in searchProducts view if search.length is > 0
                return res.render('userSearch', { search: [], devices: devices, dbAccessoryTypes: await getInDb.dbAccessoryTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks() })
            }

            if (devices.length > 0 && accessories.length == 0) {
                return res.render('userSearch', { search: userSearch, devices: devices, dbAccessoryTypes: await getInDb.dbAccessoryTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks() })
            } 



            if (accessories.length > 0 && devices.length == 0) {
                return res.render('userSearch', { search: userSearch, accessories: accessories, dbAccessoryTypes: await getInDb.dbAccessoryTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks() })
            }   

        } catch (error) {
            console.log(`Error while processing home searchbar: ${error}`);
            return res.render('unexpectedError')
        }
    }
}

module.exports = controller;