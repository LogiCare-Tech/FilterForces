const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
  
    createdAt: {
        type: Date,
        default: Date.now
    }

  
})
userSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject._id = returnedObject._id.toString()
        delete returnedObject.__v
    }
})

module.exports  = mongoose.model('User', userSchema)