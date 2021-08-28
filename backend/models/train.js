const mongoose = require('mongoose')

const trainSchema = new mongoose.Schema({
   people: [{
       type:String
   }]
})
trainSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject._id = returnedObject._id.toString()
        delete returnedObject.__v
    
    }
})
module.exports = mongoose.model('train',trainSchema)
