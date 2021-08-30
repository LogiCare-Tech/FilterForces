const User = require('../models/user.js')
const UserRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
UserRouter.get('/', async(request, response) => {
    const data = await User.find({}).populate('viz', {
        topic: 1,div:1,time:1
    }).populate('train')
    response.status(200).json(data)
})

UserRouter.post('/signup', async(request, response) =>{
    const data = request.body
    
    

    try{
        const existingUser = await User.findOne({email: data.email})
        if(existingUser)return response.status(400).json({message: "User already exists."})
        if(data.password !== data.confirmPassword)return response.status(400).json({message: "Passwords doesn't match"})
        const hashedPassword = await bcrypt.hash(data.password,12)
        const user = new User({
            username: data.username,
            name: data.name,
            firstName: data.firstName,
            email: data.email,
          
            password: hashedPassword,
           
        })
        const savedData = await user.save()
        const token  = jwt.sign({email: savedData.email, id: savedData._id}, config.SECRET, {expiresIn: '1h'})
        console.log("Token generated is ", token)
        response.status(200).json({savedData,token})
    }
    catch(err)
    {
        console.log(err)
        response.status(500).json({message:err.Error})
    }
})
UserRouter.post('/signin', async(request, response) =>{
    const {email, password} = request.body
    try{
        const existingUser = await User.findOne({email: email})
        if(!existingUser)
        {
            return response.status(404).json({message: "User doesn't exist"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect)
        {
            return response.status(400).json({message: "Invalid credentials"})
        }
        else{
            const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"})
            response.status(200).json({result: existingUser, token})
        }
    }
    catch(err){
              response.status(500).json({message: "Something went wrong"})
    }
})
module.exports = UserRouter