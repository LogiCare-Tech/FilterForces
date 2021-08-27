const loginRouter = require('express').Router()

//@desc
//@route  POST / 
loginRouter.post('/' , async(request,response) => {
    const body = request.body
  console.log(body)  
})

module.exports = loginRouter