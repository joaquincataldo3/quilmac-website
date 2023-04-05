const DB_USER =  process.env.DB_USER || 'root'
const DB_PASSWORD =  process.env.DB_PASSWORD || ''
const DB_HOST =  process.env.DB_HOST || '127.0.0.1'
const DB_DATABASE = process.env.DB_DATABASE || 'quilmac_db'
const DB_PORT = process.env.DB_PORT || 3306

const dotenv = require("dotenv").config().parsed

const DEV_DB = dotenv.DEV_DB
const DEV_DB_HOST = dotenv.DEV_DB_HOST
const DEV_DB_PASSWORD = dotenv.DEV_DB_PASSWORD
const DEV_DB_PORT = dotenv.DEV_DB_PORT
const DEV_DB_USER = dotenv.DEV_DB_USER

module.exports = {
  "development": {
    "username": DEV_DB_USER,
    "password": DEV_DB_PASSWORD,
    "database": DEV_DB,
    "host": DEV_DB_HOST,
    'port': DEV_DB_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "quilmac_local",
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
