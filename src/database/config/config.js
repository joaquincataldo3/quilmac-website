const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = require('../../config.js')

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "quilmac_db_ralway",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "quilmac_db_ralway",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "mysql"
  }
}
