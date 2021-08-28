const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

const dotenv = require('dotenv')
const passport = require("passport")
const config = require('./utils/config.js')

//Routers
const TrainRouter = require('./controllers/Train')
// const GoogleStrategy = require('passport-google-oauth20').Strategy

const AuthRouter = require("./controllers/auth")
dotenv.config()
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}

app.use(passport.initialize())
app.use(cors())

app.use(express.json())
// var user = {}
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true


})
  .then(() => {
    console.log("Connected")
  })
  .catch((error) => {
    console.log({ error: error })
  })
 app.use("/api/auth/google", AuthRouter)
 app.use("/api/Train",TrainRouter)


module.exports = app