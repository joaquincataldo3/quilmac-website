const db = require("../../src/database/models");

const dbMacbooks = async (req, res) => {
    try {
        const macbooks = await db.Device.findAll({
            where: {
                device_type_id: 2
            },
            order: [
                ['release_date', 'DESC']
            ]
        })
        return macbooks
    } catch (error) {
        console.log(`Fallé getting macbooks ${error}`)
        return res.json(error)
    }
    
} 

module.exports = dbMacbooks;