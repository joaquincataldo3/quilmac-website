const DB_USER =  process.env.DB_USER || 'root'
const DB_PASSWORD =  process.env.DB_PASSWORD || ''
const DB_HOST =  process.env.DB_HOST || '127.0.0.1'
const DB_DATABASE = process.env.DB_DATABASE || 'quilmac_db'
const DB_PORT = process.env.DB_PORT || 3306

const dotenv = require("dotenv").config().parsed

const devDb = dotenv.DEV_DB
const dbHost = dotenv.DEV_DB_HOST
const devDbPassword = dotenv.DEV_DB_PASSWORD
const dbPort = dotenv.DEV_DB_PORT
const dbUser = dotenv.DEV_DB_USER

module.exports = {
  "development": {
    "username": dbUser,
    "password": devDbPassword,
    "database": devDb,
    "host": dbHost,
    'port': dbPort,
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
