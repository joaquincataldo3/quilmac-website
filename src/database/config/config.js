const DB_USER =  process.env.DB_USER || 'root'
const DB_PASSWORD =  process.env.DB_PASSWORD || ''
const DB_HOST =  process.env.DB_HOST || '127.0.0.1'
const DB_DATABASE = process.env.DB_DATABASE || 'quilmac_db'
const DB_PORT = process.env.DB_PORT || 3306


module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "quilmac_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "quilmac_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": "mysql"
  }
}
