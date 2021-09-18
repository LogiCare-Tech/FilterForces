
const Visualize = require('../models/viz')

const VisualizeRouter = require('express').Router()

const middleware = require('../utils/middleware')

const Users = require('../models/userModel')
// VisualizeRouter.get('/deleteAll', async (request, response) => {
//     await Visualize.deleteMany({})
//     response.status(200).json({msg: "Success"})
// })

VisualizeRouter.post('/please', async (request, response) => {
    const res = request.body
    console.log("From frontend",res)
    try{
        const user = await Users.find({ username: `${res.HANDLE}` })
        console.log(user)
        let data = []
        for (let ID of user[0].viz) {
    
            let value = await Visualize.findById({ _id: `${ID}` })
            data.push(value)
    
    
        }
        console.log(data)
        response.status(200).json({data})
    }
   catch(err)
   {
       response.status(400).json({err})
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
    console.log("Ratting", data)
    const user = await Users.findOne({ _id: `${ID}` })
    if (user.username !== data.handle) {
        return response.status(401).json({ msg: "Un-Authorized" })
    }
    const savedData = await visualize.save()




    user.viz = user.viz.concat(savedData._id)

    await user.save()


    response.status(201).json(savedData)
})
module.exports = VisualizeRouter