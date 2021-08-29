const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:String,
    name: String,
    firstName: String,
    email: String,
  
    
    password: String
   ,
   viz: [
       {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Viz'
   }
],
train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'train'
}
  
})
// userSchema.virtual('from_train',{
   
//     ref:'train',
//     localField: 'visualization',
//     foreignField: '_id'
// })
// userSchema.virtual('from_visualizatoin',{
  
//        ref:'Viz',
//        localField: 'visualization',
//        foreignField: '_id'
// })
userSchema.set('toJSON', {
    transform: (document,returnedObject) => {
        
        delete returnedObject.__v
    }
})

module.exports  = mongoose.model('User', userSchema)