const dotenv = require('dotenv')
dotenv.config()

const DB_USER =  process.env.MYSQLUSER
const DB_PASSWORD =  process.env.MYSQLPASSWORD
const DB_HOST =  process.env.MYSQLHOST 
const DB_DATABASE = process.env.MYSQLDATABASE
const DB_PORT = process.env.MYSQLPORT


module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "quilmac",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "port": DB_PORT,
    "dialect": "mysql"
  }
}
