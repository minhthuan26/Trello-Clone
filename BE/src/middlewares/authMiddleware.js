const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../config')
const {MAIL_KEY} = require('../config/mailConfig')

class AuthMiddleware{
    verify = (req, res, next) => {
        const token = req.headers.token
        if(token){
            const accessToken = token.split(' ')[1]
            jwt.verify(
                accessToken,
                SECRET_KEY,
                (error, user) => {
                    if(error){
                        return res.status(403).json({msg:'Token is not valid'})
                    }
                    req.user = user
                    next()
                }
            )
        }
        else{
            return res.status(401).json({msg:'Unauthentic'})
        }
    }

    verifyEmail = (req, res, next) => {
        const verifyToken = req.params.token
        if(verifyToken){
            jwt.verify(
                verifyToken,
                MAIL_KEY,
                async (error, user) => {
                    if(error)
                        return res.status(403).json({msg: error.message})
                    req.user = user
                    next()
                }
            )
        } 
        else{
            return res.status(403).json({msg:'Bad request'})
        }
                
    }

    verifyClaim = (req, res, next) => {
        this.verify(req, res, () => {
            if(req.user.id == req.params.id){
                next()
            }
            else{
                return res.status(403).json({msg:'Access denied'})
            }
        })
    }
}

module.exports = new AuthMiddleware