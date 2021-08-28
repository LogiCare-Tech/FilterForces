
const Train = require('../models/train.js')
const TrainRouter = require('express').Router()

TrainRouter.get('/', async(request, response) => {
    const data = await Train.find({})
    response.status(200).json(data)
})

TrainRouter.post('/', async(request, response) =>{
    const train = new Train({
        people: [...request.body.people]
    })
    const savedData = await train.save()
    response.status(201).json(savedData)
    
})
module.exports = TrainRouter