const express = require('express');
const path = require('path');
const session = require('express-session');
const sessionMiddleware = require('./middlewares/adminSessionandCookie');
const cookies = require('cookie-parser');
const mainRouter = require('./routes/mainRouter');
const adminRouter = require("./routes/adminRouter");
const productsRouter = require("./routes/productsRouter");
const methodOverride = require("method-override");

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
app.use("/products", productsRouter);


const port = 3095;
app.listen(port, (req, res) => {
    console.log(`Server opened on port ${port}`)
})