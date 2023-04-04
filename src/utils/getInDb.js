const db = require("../../src/database/models");

const getInDb = {

    dbAppleDevices : async (req, res) => {
        try {
            const appleDevices = await db.DeviceType.findAll({
                where: {
                    apple_product: 1
                }
            })
            return appleDevices;
        } catch (error) {
            console.log(`Fallé en getting apple devices: ${error}`)
            return res.json(error)
        }
        
    },

    dbAccessoryTypes : async (req, res) => {
        try {
            const accessoryTypes = await db.AccessoryType.findAll()
            return accessoryTypes;
        } catch (error) {
            console.log(`Fallé en getting accessory types: ${error}`)
            return res.json(error)
        }
        
    },

    dbColors : async (req, res) => {
        try {
            const colors = await db.Color.findAll();
            return colors;
        } catch (error) {
            console.log(`Fallé en getColors: ${error}`);
            return res.json(error)
        }
        
    },

    dbIphones : async (req, res) => {
        try {
            const iphones = await db.Device.findAll({
                where: {
                    device_type_id: 1
                },
                order: [
                    ['release_date', 'DESC'],
                ],
            });
            return iphones;
        } catch (error) {
            console.log(`Fallé en getIphones: ${error}`);
            return res.json(error)
        }
        
    },

    dbMacbooks : async (req, res) => {
        try {
            const iphones = await db.Device.findAll({
                where: {
                    device_type_id: 2
                },
                order: [
                    ['release_date', 'DESC'],
                ],
            });
            return iphones;
        } catch (error) {
            console.log(`Fallé en getMacbooks: ${error}`);
            return res.json(error)
        }
        
    },

    dbCores: async () => {
        try {
            const cores = await db.Core.findAll();
            return cores;
        } catch (error) {
            console.log(`Fallé en getCores: ${error}`);
            return res.json(error)
        }
    },

    dbRams: async () => {
        try {
            const rams = await db.Ram.findAll();
            return rams;
        } catch (error) {
            console.log(`Fallé en getRams: ${error}`);
            return res.json(error)
        }
    },

    dbSsds: async () => {
        try {
            const ssds = await db.Ssd.findAll();
            return ssds;
        } catch (error) {
            console.log(`Fallé en getSsd: ${error}`);
            return res.json(error)
        }
    },


    dbDeviceTypes: async () => {
        try {
            const deviceTypes = await db.DeviceType.findAll();
            return deviceTypes;
        } catch (error) {
            console.log(`Fallé en getDeviceTypes: ${error}`);
            return res.json(error)
        }
    },

    dbStorages: async (req, res) => {
        try {
            const storages = await db.Storage.findAll()
            return storages;
        } catch (error) {
            console.log(`Fallé en getting storages: ${error}`)
            return res.json(error)
        }
        
    },


}

module.exports = getInDb;