const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

const dotenv = require('dotenv')
const passport = require("passport")
const config = require('./utils/config.js')
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


//   passport.serializeUser(function(user, done) {
//     done(null, user.id)
//   })
  
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user)
//     })
//   })
// passport.use(new GoogleStrategy(
//   {
//   clientID: config.GOOGLE_CLIENT_ID,
//   clientSecret: config.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/auth/google/callback"
// },
//   async (accessToken, refreshToken, profile, cb) => {
//    console.log(profile)
//    user = {...progile}
//    return cb(null,profile)
//   }
// ))
// app.get("/auth/google", passport.authenticate("google", {
//   scope: ["profile", "email"]
// }))
// app.get("/auth/google/callback", passport.authenticate("google", (request,response) => {
//   response.redirect("/profile")
// }))
// app.get("/user", (request,response) => {
//   console.log("Getting the user data")
//   response.send(user)
// })
// app.get("/auth/logout", (request,response) => {
//   console.log("logging out")
//   user = {}
//   response.redirect("/")
// })
module.exports = app