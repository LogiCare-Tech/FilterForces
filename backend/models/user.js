const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

    //Training info
    //Filters 
})
userSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject._id = returnedObject._id.toString()
        delete returnedObject.__v
    }
})
module.exports  = mongoose.model('User', userSchema)