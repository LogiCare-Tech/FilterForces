const express = require('express')

const cors = require('cors')

require('express-async-errors')

const mongoose = require('mongoose')

const morgan = require('morgan')

const cookieParser = require('cookie-parser')

const path = require('path')

const favicon = require('serve-favicon')

const app = express()

const middleware = require('./utils/middleware')

const dotenv = require('dotenv')

const config = require('./utils/config')

//Routers
const TrainRouter = require('./controllers/TrainCtrl')

const VisualizeRouter = require('./controllers/VisualizationCtrl')

const UserRouter = require('./controllers/userCtrl')

dotenv.config()


app.use(express.json())

app.use(cors({origin: '*'}))
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}
if(process.env.NODE_ENV === "production")
{
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
  app.use(favicon(__dirname + 'client', 'build', 'favicon.ico'))
}
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
 
 const PORT = process.env.PORT || 3001
 app.listen(PORT, () =>{
     console.log(`Server is running in ${process.env.NODE_ENV} mode on the port ${PORT}`)
 })