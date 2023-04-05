const db = require("../database/models");
const getInDb = require('../utils/getInDb')

const controller = {
    fetchCategory: async (req, res) => {

        const idCategory = req.params.idCategory;
        const selectedCategory = await db.Accessory.findAll({
            where: {
                accessory_type_id: idCategory
            }
        })
    
    return res.render('accessoryCategory', { selectedCategory, idCategory, dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks(), dbAppleDevices: await getInDb.dbAppleDevices(), dbAccessoryTypes: await getInDb.dbAccessoryTypes() })

    },
    fetchOneDevice: async (req, res) => {
        const idProduct = req.params.idProduct;
        const deviceToFetch = await db.Device.findByPk(idProduct, { include: ['images', 'colors', 'storages', 'rams', 'ssds', 'cores'] });
        return res.render('singleDevice', { deviceToFetch, dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks(), dbStorages: await getInDb.dbStorages() })
    }
}

module.exports = controller;