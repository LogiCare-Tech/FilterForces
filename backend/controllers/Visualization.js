
const Visualize = require('../models/viz')
const VisualizeRouter = require('express').Router()

const middleware = require('../utils/middleware')

VisualizeRouter.get('/', async(request,response) => {
    const data = await Visualize.find({}).populate('userId',{
        username: 1,name:1,email:1
    })
    response.status(200).json(data)
})

VisualizeRouter.post('/',middleware.tokenExtractor,middleware.userExtractor,async(request, response) => {
             

        const data = request.body
   
       
       const user = request.user
   
   const visualize = new Visualize({
       div: data.div,
       topic: [...data.topic],
       ratig: data.ratig,
       time: data.time,
       userId: data.userId
        
   })

   const savedData = await visualize.save()
  
  
   user.viz = user.viz.concat(savedData._id)
   await user.save()
   response.status(201).json(savedData)
})
module.exports = VisualizeRouter