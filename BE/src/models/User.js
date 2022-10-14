const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)