const jwt = require('jsonwebtoken')

class AuthMiddleware{
    verify = (req, res, next) => {
        const token = req.headers.token
        if(token){
            const accessToken = token.split(' ')[1]
            jwt.verify(
                accessToken,
                process.env.SECRET_KEY,
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