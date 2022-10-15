const User = require('../models/User')
class UserController{
    GetAllUsers = async (req, res, next) => {
        const users = await User.find({})
        if(!users){
            return res.status(404).json({msg:'No user'})
        }
        const userList = users.map(user => {
            let {password, ...others} = user._doc
            return {...others}
        })
        return res.status(200).json(userList)
    }
}

module.exports = new UserController