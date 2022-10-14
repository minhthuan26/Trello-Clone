const mongoose = require('mongoose')

const RefreshSchema = mongoose.Schema({
    key: {
        type: String
    },
    createBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User', 
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Refresh', RefreshSchema)