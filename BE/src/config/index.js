require('dotenv').config()

module.exports = {
    DATABASE_URL: process.env.MONGO_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    REFRESH_KEY: process.env.REFRESH_KEY,
    GOOGLE_CLIENT: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    APP_URL: process.env.APP_URL
}