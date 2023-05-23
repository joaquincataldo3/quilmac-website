const dotenv = require('dotenv')
dotenv.config()

const DB_USER =  process.env.DB_USER 
const DB_PASSWORD =  process.env.DB_PASSWORD 
const DB_HOST =  process.env.DB_HOST 
const DB_DATABASE = process.env.DB_DATABASE 
const DB_PORT = process.env.DB_PORT 


module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
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
