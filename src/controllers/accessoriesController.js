const db = require("../database/models");
const getInDb = require('../utils/getInDb')

const controller = {
    fetchCategory: async (req, res) => {

        const idCategory = req.params.idCategory;
        const selectedCategory = await db.Accessory.findAll({
            where: {
                accessory_type_id: idCategory
            },
            include: ['brands', 'accessory_images'] 
        })
 
        console.log('selected')
        console.log(selectedCategory)
    return res.render('accessoryCategory', { selectedCategory, 
        idCategory, dbStorages: await getInDb.dbStorages(), 
        dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), 
        dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), 
        dbDeviceTypes: await getInDb.dbDeviceTypes(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks(), 
        dbAppleDevices: await getInDb.dbAppleDevices(), dbAccessoryTypes: await getInDb.dbAccessoryTypes(), dbBrands: await getInDb.dbAccessoryTypes()})

    }
}

module.exports = controller;