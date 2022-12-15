
const db = require("../../src/database/models");

const getStorages = async (req, res) => {
    try {
        const storages = await db.Storage.findAll();
        return storages;
    } catch (error) {
        console.log(`Fallé en getStorages: ${error}`);
        return res.json(error)
    }
    
}

module.exports = getStorages;