const { env } = process;
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  "development": {
    "username": env.DEV_MYSQLUSER,
    "password": env.DEV_MYSQLPASSWORD,
    "database": DEV_MYSQLDATABASE,
    "host": DEV_MYSQLHOST,
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": env.PROD_MYSQLUSER,
    "password": env.PROD_MYSQLPASSWORD,
    "database": env.PROD_MYSQLDATABASE,
    "host": env.PROD_MYSQLHOST,
    "port": env.PROD_MYSQLPORT,
    "dialect": "mysql"
  },
  "production": {
    "username": env.PROD_MYSQLUSER,
    "password": env.PROD_MYSQLPASSWORD,
    "database": env.PROD_MYSQLDATABASE,
    "host": env.PROD_MYSQLHOST,
    "port": env.PROD_MYSQLPORT,
    "dialect": "mysql"
  }
}