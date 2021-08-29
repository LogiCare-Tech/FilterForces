const mongoose = require('mongoose')

const trainSchema = new mongoose.Schema({
   people: [{
       type:String
   }],
   userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref:'User'
   }
})
trainSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        
        delete returnedObject.__v
    
    }
})
module.exports = mongoose.model('train',trainSchema)
