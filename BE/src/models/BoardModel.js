const mongoose = require('mongoose')
const BoardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20 

    },
    columnOrder: {
        type: Array,
        unique: true,
        default: []
    },
    // createAt: {
    //     type: Date,
    //     unique: true,
    //     default: Date.now()
    // },
    createBy: {
        type: mongoose.Types.ObjectId,
        required:true,
        unique: true,
    },
    _destroy: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})


BoardSchema.plugin(require('mongoose-beautiful-unique-validation'));


// async function validateData(data) {
//     return await BoardSchema.validateSync(data, {abortEarly: false})
// }



module.exports = mongoose.model('board', BoardSchema)

