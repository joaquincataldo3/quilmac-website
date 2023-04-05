const dotenv = require("dotenv").config().parsed
console.log(dotenv)

const DB_USER =  process.env.DB_USER 
const DB_PASSWORD =  process.env.DB_PASSWORD 
const DB_HOST =  process.env.DB_HOST 
const DB_DATABASE = process.env.DB_DATABASE 
const DB_PORT = process.env.DB_PORT 

const devDb = dotenv.DEV_DB
const devDbHost = dotenv.DEV_DB_HOST
const devDbPassword = dotenv.DEV_DB_PASSWORD
const devDbPort = dotenv.DEV_DB_PORT
const devDbUser = dotenv.DEV_DB_USER

<<<<<<< HEAD

module.exports = {
  "development": {
    "username": devDbUser,
    "password": devDbPassword,
    "database": devDb,
    "host": devDbHost,
    "port": devDbPort,
=======
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
>>>>>>> d88f254b0e23dabb738320c7f7e2079d3dedfce8
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
