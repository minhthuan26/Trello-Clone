const mongoose = require('mongoose')
const connectDB = require('../db/connectDB')
const CardSchema = mongoose.Schema({
    boardId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    columnId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20 

    },
    cover: {
        type: String,
        unique: true,
        default: null
    },
    // createAt: {
    //     type: Date,
    //     unique: true,
    //     default: Date.now()
    // },
    // updateAt: {
    //     type: Date,
    //     unique: true,
    //     default: null
    // },
    _destroy: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

// async function validateData(data) {
//     return await BoardSchema.validateSync(data, {abortEarly: false})
// }



module.exports = mongoose.model('card', CardSchema)

