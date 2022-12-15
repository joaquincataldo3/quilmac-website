const db = require("../../src/database/models");

const dbIphones = async (req, res) => {
    try {
        const iphones = await db.Device.findAll({
                where: {
                    device_type_id: 1
                },
                order: [
                    ['release_date', 'DESC']
                ]
            })
    
        return iphones
    } catch (error) {
        console.log(`Fallé getting iphones ${error}`)
        return res.json(error)
    }
    
} 

module.exports = dbIphones;