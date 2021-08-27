const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const loginRouter = require('./controllers/login.js')
const dotenv = require('dotenv')
const config = require('./utils/config.js')
dotenv.config()
if(process.env.NODE_EVN === "development")
{
    app.use(morgan('dev'))
}
app.use(cors())

app.use(express.json())
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    retryWrites: true
   

})
.then(()=>{
    console.log("Connected")
})
.catch((error) => {
   console.log({error: error})
})
app.use('/api/login', loginRouter)

module.exports = app