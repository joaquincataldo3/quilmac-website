
const PORT = process.env.PORT || 3095
const DB_HOST = process.env.DB_HOST || "localhost"
const DB_USER = process.env.DB_USER || "root"
const DB_PASSWORD = process.env.DB_PASSWORD || null
const DB_NAME = process.env.DB_NAME || "quilmac_db_ralway"

module.exports = PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME;
