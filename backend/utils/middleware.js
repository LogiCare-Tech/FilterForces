const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
   // console.log("from token extractor ", request.authorization)
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        request['token'] = authorization.substring(7)
    }
   
    next()
}
const userExtractor = async(request, response, next) => {
     console.log("From user extractor ", request.token)
    if(request.token)
    {
        const token = request.token
        const decodedToken = jwt.verify(token, config.SECRET)
        if(!decodedToken.id){
            return response.status(401).json({error: 'User does not exist'})
        }
        else{
            const data = await User.findOne({email: decodedToken.email})
            console.log("From the middleware ", data)
            request['user'] = data
        }
    }
    next()
} 
const errorHandler = (error, request, response, next) => {
    if(error.name === 'CastError')
    {
        return response.status(400).send({
            eerror: 'malformatted id'
        })
    }
    else if(error.name === 'ValidationError')
    {
        return response.status(400).json({
            error: error.message
        })
    }
    else if(error.name === 'JsonWebTokenError')
    {
        return response.status(401).json({
            error: 'invalid token from error handler'
        })
    }
    console.log(error.message)
    next(error)
}
// const auth = async(request, response,next) => {
//     try{
//          const token = request.headers.authorization.split(" ")[1]
//          const isCustomAuth = token.length < 500
//          let decodedData
//          if(token && isCustomAuth)
//          {
//              decodedData = jwt.verify(token,'test')
//              request.userId = decodedData ?.id
//          }
//          else{
//              decodedData = jwt.decode(token)
//              request.userId = decodedData?.sub
//          }
//          next()
//     }
//     catch(error){
// console.log(error)
//     }
// }
const object = {
    tokenExtractor: tokenExtractor,
    userExtractor: userExtractor,
    errorHandler: errorHandler
}
module.exports = object