const User = require('../models/user.js')
const UserRouter = require('express').Router()

UserRouter.get('/', async(request, response) => {
    const data = await User.find({}).populate('viz', {
        topic: 1,div:1,time:1
    }).populate('train')
    response.status(200).json(data)
})

UserRouter.post('/', async(request, response) =>{
    const data = request.body
    const user = new User({
        username: data.username,
        name: data.name,
        firstName: data.firstName,
        email: data.email,
      
        password: data.password
    })
    const savedData = await user.save()
    console.log(savedData)
})
module.exports = UserRouter