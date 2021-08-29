
const Visualize = require('../models/viz')
const VisualizeRouter = require('express').Router()
const User = require('../models/user')
VisualizeRouter.get('/', async(request,response) => {
    const data = await Visualize.find({}).populate('userId',{
        username: 1,name:1,email:1
    })
    response.status(200).json(data)
})
VisualizeRouter.post('/', async(request, response) => {
   const data = request.body
   const visualize = new Visualize({
       div: data.div,
       topic: [...data.topic],
       ratig: data.ratig,
       time: data.time,
       userId: data.userId
        
   })
   const id = request.body.userId
 //  console.log(typeof id)
   const savedData = await visualize.save()
   const user = await User.findOne({_id: id})
   
   user.viz = user.viz.concat(savedData._id)
   await user.save()
   response.status(201).json(savedData)
})
module.exports = VisualizeRouter