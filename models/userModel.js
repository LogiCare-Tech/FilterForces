const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:
    {   type: String,
        required: [true, "Please enter your Codeforces username"],
      
        trim:true
    },
    name: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
  
    email: {
        type: String,
        trim: true,
        required: [true, "Please enter your email"],
        unique: true,
        
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    role: {
        type: Number,
        default: 0 //0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "" //URL for default icon of the user
    }
    

   ,
   viz: [
       {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Viz'
   }
]
  
}, {
    timestamps: true
})



module.exports  = mongoose.model('User', userSchema)