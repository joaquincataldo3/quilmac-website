const db = require("../database/models");
const dbColors =  require('../../public/utils/getColors');
const dbCores =  require('../../public/utils/getCores');
const dbDeviceTypes =  require('../../public/utils/getDeviceTypes');
const dbMacbooks =  require('../../public/utils/getMacbooks');
const dbIphones =  require('../../public/utils/getIphones');
const dbStorages =  require('../../public/utils/getStorages');
const dbRams =  require('../../public/utils/getRams');
const dbSsds =  require('../../public/utils/getSsds');
const dbAppleDevices = require('../../public/utils/getAppleDevices.js');


const controller = {
    // just rendering the home
    home: async (req, res) => { 
        return res.render('home', {dbMacbooks: await dbMacbooks(), dbIphones: await dbIphones(), dbAppleDevices: await dbAppleDevices(), dbStorages: await dbStorages(), dbColors: await dbColors(), dbRams: await dbRams(), dbSsds: await dbSsds(), dbCores: await dbCores(), dbDeviceTypes: await dbDeviceTypes()})
    }
}

module.exports = controller;