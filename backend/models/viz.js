const mongoose = require('mongoose')

const vizSchema = new mongoose.Schema({
   div:{
      type: Number
   },
   rating:{
       type: Number
   },
   topic:[{
       type: String
   }],
  time:{
      type:String,
      required:true
  }
})
vizSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        returnedObject._id = returnedObject._id.toString()
        delete returnedObject.__v
    
    }
})
module.exports = mongoose.model('Viz',vizSchema)
