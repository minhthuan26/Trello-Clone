require('dotenv').config()

module.exports = {
    MAILER: process.env.MAILER,
    MAIL_KEY: process.env.MAIL_KEY,
    HOST: process.env.MAIL_HOST,
    PORT: process.env.MAIL_PORT,
    USERNAME: process.env.MAIL_USERNAME,
    PASSWORD: process.env.MAIL_PASSWORD,
    FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    FROM_NAME: process.env.MAIL_FROM_NAME  
}