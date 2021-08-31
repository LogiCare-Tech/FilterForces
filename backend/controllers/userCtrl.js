//Router
const UserRouter = require('express').Router()

//User model
const Users = require('../models/userModel.js')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

//Config file has all sensitive data like db URI, SECRET etc
const config = require('../utils/config')

const sendMail = require('./sendMail')

UserRouter.get('/', async(request, response) => {
    const data = await Users.find({}).populate('viz', {
        topic: 1,div:1,time:1
    }).populate('train')
    response.status(200).json(data)
})

UserRouter.post('/signup', async(request, response) =>{
    const data = request.body
    
    

    try{
        const existingUser = await Users.findOne({email: data.email})
        if(existingUser)return response.status(400).json({message: "User already exists."})
        if(data.password !== data.confirmPassword)return response.status(400).json({message: "Passwords doesn't match"})
        const hashedPassword = await bcrypt.hash(data.password,12)
        const user = new Users({
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
        const existingUser = await Users.findOne({email: email})
        
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
            const token = jwt.sign({email: existingUser.email, id: existingUser._id}, config.SECRET, {expiresIn: "1h"})
            response.status(200).json({result: existingUser, token})
        }
    }
    catch(err){
              response.status(500).json({message: "Something went wrong"})
    }
})

//Functions to handle register 
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const createActivationToken = (payload) => {
    return jwt.sign(payload,`${config.ACCESS_TOKEN_SECRET}`,{expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}


UserRouter.post('/register', async(request, response) =>{
   
    try{
        const {name, email, password} = request.body
        
        if(!name || !email || !password){
            return response.status(400).json({msg: "Please fill in all fields."})
        }
        if(!validateEmail(email)){
            return response.status(400).json({msg: email + " is not valid :("})
        }
        const user = await Users.findOne({email: email})
       
        if(user) return response.status(400).json({message: "This email already exists."})
        
        if(password.length < 6){
            return response.status(400).json({msg: "Password must be atleast 6 characters"})
        }

        const passwordHash = await bcrypt.hash(password,12)
        
        const newUser = {
            name: name,
            email: email,
            password: passwordHash
        }
        
        const activation_token = createActivationToken(newUser)
        console.log("hi -> ",activation_token)
        const url = `${config.CLIENT_URL}/user/activate/${activation_token}`

        sendMail(email, url, "Verify your email address")

        response.json({msg: "Register Success! Please activate your email to start."})
    }
    catch(error){
        return response.status(500).json({msg: error.message})
    }
})
UserRouter.post('/activateEmail', async(request, response) =>{
   
   try{
    const {activation_token} = request.body
    console.log("hi ",activation_token)
   const user =  jwt.verify(activation_token, `${config.ACCESS_TOKEN_SECRET}`)

    const {name, email, password} = user
    const check = await Users.findOne({email})
    if(check)
    {
        return res.status(400).json({msg: "This email already exists"})
    }
    const newUser = new Users({
        name: name,
        email: email,
        password: password
    })
    await newUser.save()
    response.json({msg: "Account has been activated"})
   }
   catch(err){
       return response.status(500).json({msg: err.message})
   }
    
})
module.exports = UserRouter