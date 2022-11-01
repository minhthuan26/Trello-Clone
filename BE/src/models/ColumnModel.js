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
        unique: true,
        minLength: 3,
        maxLength: 20 

    },
    cardOrder: {
        type: Array,
        unique: true,
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

