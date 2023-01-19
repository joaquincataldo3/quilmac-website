const path = require("path");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const folder = path.join(__dirname, "../../public/images/accessories")
        cb(null, folder)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + ' ' + file.originalname)
    }
})

const uploadFile = multer( {storage: storage} ); 

module.exports = uploadFile;