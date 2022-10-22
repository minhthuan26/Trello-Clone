const mongoose = require('mongoose')

const UserGoogleSchema = mongoose.Schema({
    providerid: {
        type: String,
        required: true
    },
    userid:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('UserGoogle', UserGoogleSchema)