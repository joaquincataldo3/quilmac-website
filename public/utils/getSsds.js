const db = require("../../src/database/models");

const getSsds = async (req, res) => {
    try {
        const ssds = await db.Ssd.findAll();
        return ssds;
    } catch (error) {
        console.log(`Fallé en getSsds: ${error}`);
        return res.json(error)
    }
    
}

module.exports = getSsds;