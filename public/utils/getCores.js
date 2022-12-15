const db = require("../../src/database/models");

const getCores = async () => {
    try {
        const cores = await db.Core.findAll();
        return cores;
    } catch (error) {
        console.log(`Fallé en getCores: ${error}`);
        return res.json(error)
    }
    
}

module.exports = getCores;