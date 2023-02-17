const db = require("../database/models");
const { validationResult } = require('express-validator');
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const getInDb = require('../utils/getInDb')
const adminRoutesMiddleware = require('../middlewares/rejectRoute');
const deviceCreationValidation = require("../middlewares/deviceCreationValidation");
const accessoryCreationValidation = require("../middlewares/accessoryCreationValidation");
const uploadDeviceImages = require("../middlewares/multerForDeviceCreation");
const uploadAccessoryImages = require("../middlewares/multerForAccessoryCreation");





const controller = {
    register: (req, res) => {
        return res.render("register", {admin: req.session.adminLogged})
    },
    processAdminRegister: async (req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const oldBody = req.body;
                return res.render("register", { errors: errors.mapped(), oldBody });
            }

            const newAdmin = {
                username: req.body.username,
                password: bcryptjs.hashSync(req.body.password, 10)
            }

            await db.Admin.create(newAdmin);

            return res.redirect("/admin/login")

        } catch (error) {
            console.log("error");
            return res.render('unexpectedError');
        }
    },
    loginForm: (req, res) => {
        res.clearCookie('adminCookie');
        return res.render("login");

    },
    processLogin: async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const oldBody = req.body;
            console.log(req.body);
            return res.render("login", { errors: errors.mapped(), oldBody });
        }


        const adminInDb = await db.Admin.findOne({
            where: {
                username: req.body.username
            }
        })

        if (!adminInDb) {
            console.log('Admin notFound');
            const oldBody = req.body;
            return res.render("login", { errors: { username: { msg: "There is no admin found with that username" } }, oldBody });
        }

        const verifyPassword = bcryptjs.compareSync(req.body.password, adminInDb.password)

        if (!verifyPassword) {
            console.log('Please enter a valid password');
            const oldBody = req.body;
            return res.render("login", { errors: { password: { msg: "Please enter a valid password" } }, oldBody });

        }
        
        const adminAuthenticated = adminInDb.username;
          

        if (req.body.remember_me) {
            res.cookie('adminCookie', adminAuthenticated, { maxAge: (60 * 1000) *  1000 })
        }

        req.session.adminLogged = adminAuthenticated;

        return res.redirect('/')


    },
    logout: (req, res) => {
        req.session.destroy(); 
        res.clearCookie("adminCookie"); 
        return res.redirect("/")
    }
}

module.exports = controller;