const db = require("../../src/database/models");

const dbAppleDevices = async (req, res) => {

    try {
        const appleDevices = await db.DeviceType.findAll({
            where: {
                apple_product: 1
            }
        });
        return appleDevices
    } catch (error) {
        console.log(`Fallé en getting apple devices: ${error}`)
        return res.json(error)
    }
    
} 

module.exports = dbAppleDevices