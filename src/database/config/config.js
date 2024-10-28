const { env } = process;
const dotenv = require('dotenv')
dotenv.config()

const DB_USER =  env.PROD_MYSQLUSER ?? env.DEV_MYSQLUSER;
const DB_PASSWORD =  env.PROD_MYSQLPASSWORD ?? env.DEV_MYSQLPASSWORD;
const DB_HOST =  env.PROD_MYSQLHOST ?? env.DEV_MYSQLHOST;
const DB_DATABASE = env.PROD_MYSQLDATABASE ?? env.DEV_MYSQLDATABASE;
const DB_PORT = env.PROD_MYSQLPORT ?? env.DEV_MYSQLPORT;
console.log(env)

module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "port": 3306,
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
