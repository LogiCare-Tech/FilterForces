
const Visualize = require('../models/viz')

const VisualizeRouter = require('express').Router()

const middleware = require('../utils/middleware')

const Users = require('../models/userModel')


VisualizeRouter.post('/private', middleware.auth, async (request, response) => {
    const res = request.body
    
    
   
    try {
        const user = await Users.find({ _id: `${request.user.id}`})
        
        if(user[0].username !== res.username)
        {
            return response.status(400).json({msg: "username is incorrect"})
        }
        if(user[0].viz)
        {
            let data = []
            for (let ID of user[0].viz) {
    
                let value = await Visualize.findById({ _id: `${ID}` })
                data.push(value)
            }
            response.status(200).json({ data })
        }
        else{
            response.status(400).json({msg: "Statistics not found"})
        }
        
    }
    catch (err) {
        response.status(400).json({ msg: err })
    }

})


VisualizeRouter.post('/', middleware.auth, async (request, response) => {

    const data = request.body

    let ID = request.user.id


    const visualize = new Visualize({
        type: data.type,
        topic: [...data.topic],
        rating: Number(data.rating),
        time: data.time,
        userId: `${ID}`

    })
   
    const user = await Users.findOne({ _id: `${ID}` })
 
    const savedData = await visualize.save()




    user.viz = user.viz.concat(savedData._id)

    await user.save()


    response.status(201).json(savedData)
})
module.exports = VisualizeRouter