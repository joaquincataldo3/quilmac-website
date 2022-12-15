const db = require("../../src/database/models");

const getRams = async (req, res) => {
    try {
        const rams = await db.Ram.findAll();
        return rams;
    } catch (error) {
        console.log(`Fallé en getRams: ${error}`);
        return res.json(error)
    }
    
}

module.exports = getRams;