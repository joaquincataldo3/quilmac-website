const db = require("../../src/database/models");

const getColors = async (req, res) => {
    try {
        const colors = await db.Color.findAll();
        return colors;
    } catch (error) {
        console.log(`Fallé en getColors: ${error}`);
        return res.json(error)
    }
    
}

module.exports = getColors;