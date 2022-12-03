const mongoose = require('mongoose')
const connectDB = require('../db/connectDB')
const ColumnSchema = mongoose.Schema({
    boardId:{
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
    date: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now
    },
    cardOrder: {
        type: Array,
        unique: false,
        default: []
    },
    _destroy: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

// async function validateData(data) {
//     return await BoardSchema.validateSync(data, {abortEarly: false})
// }



module.exports = mongoose.model('column', ColumnSchema)

