const db = require("../../src/database/models");

const getDeviceTypes = async (req, res) => {
    try {
        const deviceTypes = await db.DeviceType.findAll();
        return deviceTypes;
    } catch (error) {
        console.log(`Fallé en getDeviceTypes: ${error}`);
        return res.json(error)
    }
    
}

module.exports = getDeviceTypes;