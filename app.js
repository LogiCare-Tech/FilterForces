const express = require('express')

const cors = require('cors')

require('express-async-errors')

const mongoose = require('mongoose')

const morgan = require('morgan')

const cookieParser = require('cookie-parser')

const app = express()

const middleware = require('./utils/middleware')

const dotenv = require('dotenv')

const config = require('./utils/config')

//Routers
const TrainRouter = require('./controllers/TrainCtrl')

const VisualizeRouter = require('./controllers/VisualizationCtrl')

const UserRouter = require('./controllers/userCtrl')

dotenv.config()

if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use(cors())

app.use(cookieParser())

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

 
 app.use("/api/Users", UserRouter)

 app.use("/api/Train",TrainRouter)

 app.use("/api/Visualize", VisualizeRouter)
 
 app.use(middleware.errorHandler)
 
module.exports = app