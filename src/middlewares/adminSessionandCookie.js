const db = require("../database/models");

async function adminLogged (req, res, next) {
    try {
        res.locals.isLogged = false;

        let adminCookie = await db.Admin.findOne({
            where:{
                username: req.cookies && req.cookies.adminCookie ? req.cookies.adminCookie : ''
            }
        }); 

        if (adminCookie) {
            req.session.adminLogged = adminCookie.username; //SESSION SIEMPRE EN REQ 
        }; 

        if (req.session && req.session.adminLogged) {
            res.locals.isLogged = true;
            res.locals.adminLogged = req.session.adminLogged;
        };

        return next();
    } catch (error) {
        console.log(`Fallé en el middleware de admin session and cookie: ${error}`);
        return res.redirect('/')
    }
        
}

module.exports = adminLogged;