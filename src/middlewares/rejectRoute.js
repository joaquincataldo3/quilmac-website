// reject request to login and register if user not logged

const verifyAdminLogged = (req, res, next) => {

    if(!req.session.adminLogged) {
        return res.redirect('/admin/login')
    }

    next()

}

module.exports = verifyAdminLogged;