const db = require("../database/models");
const getInDb =  require('../utils/getInDb');



const controller = {
    // just rendering the home
    home: async (req, res) => {
        try {
            return res.render('home', {dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks()})
        } catch (error) {
            console.log(`Fail while rendering home ${error}`)
            return res.render('unexpectedError')
        } 
    },
    iphonesIpadsSupport: async (req, res) => {
        try {
            return res.render('iphonesIpadsSupport', {dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks()})
        } catch (error) {
            console.log(`Fail Fail while rendering iphones - ipads support page ${error}`)
            return res.render('unexpectedError')
        }
    },
    macbooksIpadsSupport: async (req, res) => {
        try {
            return res.render('macbooksIpadsSupport', {dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks()})
        } catch (error) {
            console.log(`Fail Fail while rendering macbooks - imacs support page ${error}`)
            return res.render('unexpectedError')
        }
    },
    otherDevicesSupport: async (req, res) => {
        try {
            return res.render('otherDevicesSupport', {dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks()})
        } catch (error) {
            console.log(`Fail while rendering other devices support page ${error}`)
            return res.render('unexpectedError')
        }
    },
    contactUs: async (req, res) => {
        try {
            return res.render('contactUs', {dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbAppleDevices: await getInDb.dbAppleDevices(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks()})
        } catch (error) {
            console.log(`Fail while rendering contact page ${error}`)
            return res.render('unexpectedError')
        }
    },
}

module.exports = controller;