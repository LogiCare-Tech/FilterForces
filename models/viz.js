const mongoose = require('mongoose')

const vizSchema = new mongoose.Schema({
    
    rating: {
        type: Number
    },
    type: String,
    topic: [{
        type: String
    }],
    time: {
        type: String
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
