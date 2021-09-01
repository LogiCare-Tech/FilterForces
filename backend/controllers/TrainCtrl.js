
const Train = require('../models/train.js')

const TrainRouter = require('express').Router()

const Users = require('../models/userModel')

const middleware = require('../utils/middleware')

TrainRouter.get('/', middleware.auth ,async(request, response) => {

    const user = await Users.findById({_id: request.user.id})

    if(!user) return response.status(400).json({msg: "Invalid Authentication."})

    const data = await Train.findById({_id: `${user.train._id}`}).populate('userId')

    response.status(200).json(data)
})

TrainRouter.post('/', middleware.auth, async(request, response) =>{
    
    
    const train = new Train({
        people: [...request.body.people],

        userId: request.user.id
    })

    const savedData = await train.save()
  
    const user = await Users.findOne({_id: request.user.id})

    user.train = savedData._id

    await user.save()

    response.status(201).json(savedData)
    
})
module.exports = TrainRouter