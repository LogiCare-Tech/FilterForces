const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const config = require('./utils/config.js')
dotenv.config()

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

module.exports = app