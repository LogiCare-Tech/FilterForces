const mongoose = require('mongoose')

const vizSchema = new mongoose.Schema({
    div: {
        type: Number
    },
    rating: {
        type: Number
    },
    topic: [{
        type: String
    }],
    time: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
vizSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        
        delete returnedObject.__v

    }
})
module.exports = mongoose.model('Viz', vizSchema)
