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
        unique: false,
        minLength: 3,
        maxLength: 255 

    },
    cover: {
        type: String,
        unique: true,
        default: null
    },
    status: {
        type: Boolean,
        default: false
    },
    time: {
        type: Date,
        required:true
    },
    _destroy: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

// async function validateData(data) {
//     return await BoardSchema.validateSync(data, {abortEarly: false})
// }



module.exports = mongoose.model('card', CardSchema)

