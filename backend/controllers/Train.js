
const Train = require('../models/train.js')
const TrainRouter = require('express').Router()
const User = require('../models/userModel')
TrainRouter.get('/', async(request, response) => {
    const data = await Train.find({}).populate('userId')
    response.status(200).json(data)
})

TrainRouter.post('/', async(request, response) =>{
    const train = new Train({
        people: [...request.body.people],
        userId: request.body.userId
    })
    const savedData = await train.save()
    const id = request.body.userId
    const user = await User.findOne({_id: id})
    user.train = savedData._id
    await user.save()
    response.status(201).json(savedData)
    
})
module.exports = TrainRouter