const { json } = require('express')
const nodeMailer = require('nodemailer')
const mailConfig = require('../config/mailConfig')

exports.sendMail = async (to, subject, message) => {
    const transport = nodeMailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: false,
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD
        }
    })

    const options = {
        from: mailConfig.FROM_ADDRESS,
        to: to,
        subject: subject,
        html: message,
    }

    return await transport.sendMail(options, (error, res, next) => {
        if (error){
            return res.status(500).json({msg: 'Something wrong, please try again later'})
        }
        next()
    })
}