
const Visualize = require('../models/viz')

const VisualizeRouter = require('express').Router()

const middleware = require('../utils/middleware')

const Users = require('../models/userModel')

VisualizeRouter.get('/', middleware.auth, async (request, response) => {
    const user = await Users.findById({_id: request.user.id})
    let data = []
    for(let ID of user.viz){
        let value = await Visualize.findById({_id: ID}).populate('userId', {
            username: 1, name: 1, email: 1
        })
        data.push(value)
    }
    
    response.status(200).json({...data})
})

VisualizeRouter.post('/', middleware.auth, async (request, response) => {

    const data = request.body
   
    const visualize = new Visualize({
        div: data.div,
        topic: [...data.topic],
        ratig: data.ratig,
        time: data.time,
        userId: request.user.id

    })

    const savedData = await visualize.save()

    const user = await Users.findOne({ _id: request.user.id })

    user.viz = user.viz.concat(savedData._id)

    await user.save()

    response.status(201).json(savedData)
})
module.exports = VisualizeRouter