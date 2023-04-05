const express = require('express');
const path = require('path');
const session = require('express-session');
const sessionMiddleware = require('./middlewares/adminSessionandCookie');
const cookies = require('cookie-parser');
const mainRouter = require('./routes/mainRouter');
const adminRouter = require("./routes/adminRouter");
const productsRouter = require("./routes/productsRouter");
const accessoriesRouter = require("./routes/accessoriesRouter");
const homeSearchbarRouter = require("./routes/homeSearchbarRouter");
const methodOverride = require("method-override");
const getInDb =  require('./utils/getInDb');
require("dotenv").config()

const app = express();
 
app.use(session({ 
    secret: "Conf middleware global session",
    resave: false,
    saveUninitialized: false
}));

app.use(cookies())


// method override for put and delete methods
app.use(methodOverride('_method'))

// ************ Setting up functions for bodies and jsons ************
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use(sessionMiddleware);

// ************ Setting up template engine ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// *********** Setting up staticsfolder ************

app.use(express.static(path.join(__dirname, '../public')));


app.use('/', mainRouter);
app.use("/admin", adminRouter);
app.use("/accesorios", accessoriesRouter);
app.use("/productos", productsRouter);
app.use("/", homeSearchbarRouter);
app.use(async (req, res, next) => {
    res.status(404).render('404error', {dbAppleDevices: await getInDb.dbAppleDevices(), dbStorages: await getInDb.dbStorages(), dbColors: await getInDb.dbColors(), dbRams: await getInDb.dbRams(), dbSsds: await getInDb.dbSsds(), dbCores: await getInDb.dbCores(), dbDeviceTypes: await getInDb.dbDeviceTypes(), dbIphones: await getInDb.dbIphones(), dbMacbooks: await getInDb.dbMacbooks()})
  })

const PORT = process.env.PORT || 3095

app.listen(PORT, (req, res) => {
    console.log(`Server opened on port ${PORT}`)
})